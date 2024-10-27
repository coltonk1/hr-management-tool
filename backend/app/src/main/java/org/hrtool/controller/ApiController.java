package org.hrtool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.hrtool.repository.ExpenseCardRepository;
import org.hrtool.repository.ExpenseRepository;
import org.hrtool.repository.UserRepository;
import org.hrtool.tables.Users;
import org.hrtool.models.LoginRequest;
import org.hrtool.models.NewExpenseCardRequest;
import org.hrtool.models.NewExpenseRequest;
import org.hrtool.models.SignupRequest;
import org.hrtool.tables.ExpenseCards;
import org.hrtool.tables.Expenses;
import org.apache.catalina.connector.Response;
import org.hrtool.exceptions.*;

import java.security.SignatureException;
import java.time.Instant;
import java.util.*;

import javax.crypto.SecretKey;
import javax.validation.Valid;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
@Validated
public class ApiController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private ExpenseCardRepository expenseCardRepository;
   
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApiController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    // Secret key for encoding/hashing
    private static final String SECRET_KEY = "some secret key"; // Should read this from a .env file

    // Token expiration time (1000 * 60 * 60 = 1 hour)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;


    /**
     * Handles user signup requests.
     * <p>
     * This method registers a new user by taking a {@link SignupRequest} containing
     * the username
     * and password. It first checks if the username already exists in the database.
     * If the username
     * is unique, it saves the user with the encoded password in the database.
     * </p>
     * 
     * @param signupRequest the request body containing the username and password
     *                      for the new user.
     * @return a {@link ResponseEntity} containing:
     *         <ul>
     *         <li><strong>201 CREATED</strong> if the user is successfully
     *         registered.</li>
     *         <li><strong>409 CONFLICT</strong> if the username already
     *         exists.</li>
     *         <li><strong>500 INTERNAL SERVER ERROR</strong> if an unexpected error
     *         occurs.</li>
     *         </ul>
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid SignupRequest signupRequest) {
        try {
            // Check if the username already exists
            System.out.println("Username: " + signupRequest.getUsername());
            System.out.println("Password: " + signupRequest.getPassword());
            System.out.println("Password: " + signupRequest.getPassword());
            System.out.println("Hello");
            System.out.println("ajsdhfj-" + userRepository.findByUsername(signupRequest.getUsername()));

            Instant instant = Instant.parse(signupRequest.getBirthday());
            Timestamp birthdayTimestamp = Timestamp.from(instant);  

            Instant instant2 = Instant.parse(signupRequest.getHiringDate());
            Timestamp hiringDateTimestamp = Timestamp.from(instant2);  
            
            if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
                System.out.println("username already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            // Create new user
            Users user = new Users(signupRequest.getFirstName(),signupRequest.getLastName(),signupRequest.getPhoneNumber(), signupRequest.getSSN(),signupRequest.getPersonalEmail(), signupRequest.getStreetAddress(), signupRequest.getCityAddress(), signupRequest.getStateAddress(), signupRequest.getPostalCodeAddress(), birthdayTimestamp,signupRequest.getUsername(),
            passwordEncoder.encode(signupRequest.getPassword() + SECRET_KEY),signupRequest.getStatus(), hiringDateTimestamp, signupRequest.getPositionId(), signupRequest.getSalary());
            // ? would also add any other details necessary to the Users table and here

            userRepository.save(user); // Save user to the database

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            System.out.println("Error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    /**
     * Handles user login requests by authenticating the provided username and
     * password.
     * <p>
     * This method validates the user's credentials and, upon successful
     * authentication, generates a JSON Web Token (JWT) which is returned in the
     * response. If the credentials are invalid or the user is not found, the method
     * returns appropriate HTTP error responses.
     * </p>
     *
     * @param loginRequest the request body containing the username and password
     *                     entered by the user during the login process. This
     *                     request body should be validated.
     * @return a {@link ResponseEntity} with one of the following responses:
     *         <ul>
     *         <li>HTTP 200 OK with a JWT token in the body if authentication is
     *         successful.</li>
     *         <li>HTTP 401 Unauthorized if the password does not match.</li>
     *         <li>HTTP 404 Not Found if the username does not exist in the
     *         database.</li>
     *         <li>HTTP 500 Internal Server Error if an unexpected error occurs
     *         during processing.</li>
     *         </ul>
     * @throws UserNotFoundException if the username is not found in the database,
     *                               which indicates the user does not exist.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest) {
        // ! maybe should change if no username or wrong password to be the same error
        try {
            Users user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            System.out.println("login requested");
            if (passwordEncoder.matches(loginRequest.getPassword() + SECRET_KEY, user.getPassword())) {
                String token = generateToken(user);
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }


    /* Handles requests to add a new expense.  Once the request is recieved, its contents are verified and it is then added to the
     * database.
     */
    @PostMapping("/create_new_expense")
    public ResponseEntity<String> createNewExpense(@RequestBody @Valid NewExpenseRequest newExpenseRequest){

            try{
            Expenses expense = new Expenses(newExpenseRequest.getName(),newExpenseRequest.getDate(), newExpenseRequest.getCategory(), newExpenseRequest.getAmount(), newExpenseRequest.getDescription(), newExpenseRequest.getEmployeeId(), newExpenseRequest.getExpenseCardId());
            expenseRepository.save(expense);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Expense successfully added");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Expense not added: " + e);
        }

    }

    /* Retrieves a list of all employees stored in the database.
     * 
     */
    @GetMapping("/get_all_users")
    public ResponseEntity<List<Users>> getAllUsers(){
        List<Users> users = userRepository.findAll();
        System.out.println("Finding all users");
        return ResponseEntity.ok(users);
    }

    /* Adds a new expense card to the database.
     */
    @PostMapping("/create_new_expense_card")
    public ResponseEntity<String> createNewExpenseCard(@RequestBody @Valid NewExpenseCardRequest newExpenseCardRequest){
        try{
            ExpenseCards card = new ExpenseCards(newExpenseCardRequest.getCardNumber(), newExpenseCardRequest.getExpirationDate(), newExpenseCardRequest.getSecurityCode(), newExpenseCardRequest.getIssuanceDate(), newExpenseCardRequest.getStatus(), newExpenseCardRequest.getSpendingLimit(), newExpenseCardRequest.getEmployeeId());

            expenseCardRepository.save(card);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Expense card successfully added");

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Expense not added: " + e);
        }
    }

    /**
     * Generates a JWT token for the specified user.
     *
     * This method creates a JSON Web Token (JWT). The token is signed using
     * a secret key and can be used for authenticating the user in subsequent
     * requests. The method may throw a {@link SignatureException} if there is
     * an issue with the signing process.
     *
     * @param user the user from which the token is being generated
     * @return a signed JWT token as a string
     * @throws SignatureException if there is an error during the signing process
     */
    private String generateToken(Users user) throws SignatureException { // ! Should change Users type to something else
        return Jwts.builder()
                .setIssuer("me")
                .setSubject(user.getUsername()) // Set the subject
                .claim("Some Name", "Some Value")
                .claim("Some Name 2", "Some Value")
                .setIssuedAt(new Date(System.currentTimeMillis())) // Set issued time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Set expiration time
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256) // Sign the token
                .compact();
    }

    /**
     * Reads and validates a JWT token to extract its claims.
     *
     * This method attempts to parse a JWT token using the same signing
     * key that was used during its creation. If the token is valid, it returns
     * the claims contained within the token. If the token is invalid or cannot
     * be processed (e.g., due to expiration or signature mismatch), it catches
     * the exception and returns null.
     *
     * @param token the JWT token to be read and validated
     * @return the claims contained in the token if valid. otherwise, null
     */
    private Claims readToken(String token) {
        try {
            // Use the same signing algorithm and key used to create the token
            SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

            // Parse the token and extract claims
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            // Handle token parsing exceptions (e.g., expired token, invalid signature)
            System.err.println("Failed to read token: " + e.getMessage());
            return null;
        }
    }


    



    /**
     * Handles validation exceptions that occur when method arguments are not valid.
     *
     * This method is triggered when a {@link MethodArgumentNotValidException} is
     * thrown,
     * indicating that a request body or method parameter failed validation. It
     * returns
     * a response with a status of {@link HttpStatus#BAD_REQUEST} and provides the
     * default error message associated with the field that failed validation.
     *
     * @param ex the exception that was thrown, containing details about the
     *           validation errors
     * @return a {@link ResponseEntity} containing the error message and a 400 Bad
     *         Request status
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ex.getBindingResult().getFieldError().getDefaultMessage());
    }
}

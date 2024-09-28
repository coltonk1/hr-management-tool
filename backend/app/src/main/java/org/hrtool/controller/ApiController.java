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

import org.hrtool.repository.UserRepository;
import org.hrtool.tables.Users;
import org.hrtool.models.LoginRequest;
import org.hrtool.models.SignupRequest;

import org.hrtool.exceptions.*;

import java.security.SignatureException;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Validated
public class ApiController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Secret key for encoding/hashing
    private static final String SECRET_KEY = "some secret key"; // Should read this from a .env file

    // Token expiration time (1000 * 60 * 60 = 1 hour)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    /**
     * A simple GET endpoint that returns a "Hello, World!" message.
     * This can be used to test if the API is up and running by returning
     * a basic response.
     *
     * @return a ResponseEntity with:
     *         - HTTP 200 OK status and a "Hello, World!" message in the body.
     */
    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld() {
        return ResponseEntity.ok("Hello, World!");
    }

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
            if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            // Create new user
            Users user = new Users(signupRequest.getUsername(),
                    passwordEncoder.encode(signupRequest.getPassword() + SECRET_KEY));
            // ? would also add any other details necessary to the Users table and here

            userRepository.save(user); // Save user to the database

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
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
            return Jwts.parserBuilder()
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

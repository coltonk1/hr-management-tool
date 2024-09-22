package org.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import org.example.models.User;
import java.util.concurrent.CompletableFuture;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Validated
public class ApiController {
    // Get request (/api/hello)
    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld() {
        return ResponseEntity.ok("Hello, World!");
    }

    // Async creates a new thread, so should use it on tasks that take more time to
    // complete (this is bad example)
    @Async
    // Post request (/api/user)
    @PostMapping("/user")
    // Completable future for a task that will complete eventually, similar to a
    // promise
    public CompletableFuture<ResponseEntity<User>> receiveData(@RequestBody @Valid User user) {
        return CompletableFuture.completedFuture(ResponseEntity.ok(user));
    }

    // If not @Valid, then this exception catches
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        // If the input is invalid, return a "Wrong input" message
        System.out.println("Validation error: " + ex.getBindingResult().getFieldError().getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ex.getBindingResult().getFieldError().getDefaultMessage());
    }
}

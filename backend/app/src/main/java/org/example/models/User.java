package org.example.models;

import jakarta.validation.constraints.*;

// example user
public class User {
    private String id;

    @NotBlank(message = "Name is required and must not be blank")
    @Max(value = 100, message = "Email should not be more than 100 characters")
    private String name;

    @Email(message = "Email must be formatted properly")
    @NotBlank(message = "Email is required")
    @Max(value = 250, message = "Email should not be more than 250 characters")
    private String email;

    @Size(min = 8, max = 150, message = "Password must not be less than 8 characters")
    private String password; // hash password somehow too

    private String role; // E.g., "ADMIN", "USER", etc.

    // Constructor
    public User(String id, String name, String email, String password, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Method to display user information
    public String displayInfo() {
        return "User ID: " + id + ", Name: " + name + ", Email: " + email + ", Role: " + role;
    }
}
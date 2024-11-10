package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Username or email is required and must not be blank")
    private String username;
    @NotBlank(message = "Password is required and must not be blank")
    private String password;
}
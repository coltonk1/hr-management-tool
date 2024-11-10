package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    @NotBlank(message = "Username or email is required and must not be blank")
    private String username;
    @NotBlank(message = "Password is required and must not be blank")
    private String password;
    @NotBlank(message = "Full name is required and must not be blank")
    private String fullName;
    @NotBlank(message = "Personal email is required")
    private String email;
    @NotBlank(message = "Status required")
    private String status;

    private String ssn;
    private String phoneNumber;
    private String streetAddress;
    private String cityAddress;
    private String stateAddress;
    private String postalCodeAddress;
    private String birthday;
}

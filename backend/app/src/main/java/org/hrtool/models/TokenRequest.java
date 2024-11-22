package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {
    @NotEmpty(message = "Must include token")
    private String token;

    private Long business_id;
    private Long user_id;
    private String date;
}

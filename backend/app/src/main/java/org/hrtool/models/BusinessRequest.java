package org.hrtool.models;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessRequest {
    private String banner_url;
    private String logo_url;
    private String token;
    private String name;
    private String user_name;
    private String recovery_email;
    private String position;
}
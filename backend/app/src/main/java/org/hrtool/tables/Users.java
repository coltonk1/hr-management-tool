package org.hrtool.tables;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import java.sql.Timestamp;
import java.util.Optional;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String phoneNumber;
    private String ssn;
    private String email;
    private String streetAddress;
    private String cityAddress;
    private String stateAddress;
    private String postalCodeAddress;
    private Timestamp birthday;
    private String username;
    private String password;
    private String status;
}

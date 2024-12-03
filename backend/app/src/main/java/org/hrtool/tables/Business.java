package org.hrtool.tables;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import java.sql.Timestamp;
import java.util.Optional;

@Entity
@Table(name = "business")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long business_id;
    private Long owner_id;

    private String name;
    private String phone;
    private String recovery_email;
    private String addr;

    private String description;
    private String website;

    private String banner_url;
    private String logo_url;
}

package org.hrtool.tables;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private Long business_id;

    private Date hiring_date;
    private Date release_date;

    private float salary;
    private float total_hours;
    private String name;
    private String position;
    private String department;
    private String description;
}

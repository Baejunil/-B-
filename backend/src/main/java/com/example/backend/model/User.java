package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Users")
public class User {
    @Id
    private String userId;

    private String email;
    private String password;
    private String username;
    private String status;
    private LocalDate joinDate;

    // Getters and Setters
}

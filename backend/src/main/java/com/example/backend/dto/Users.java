package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Users {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    private String userId; // Primary Key

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "birthdate")
    @Temporal(TemporalType.DATE)
    private Date birthdate;

    @Column(name = "join_date")
    @Temporal(TemporalType.DATE)
    private Date joinDate;

    @Column(name = "gender")
    private String gender;
}

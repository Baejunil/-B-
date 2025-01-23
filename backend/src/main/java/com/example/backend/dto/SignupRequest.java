package com.example.backend.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String userId;
    private String password;
    private String confirmPassword;
    private String email;
    private String name;
    private String gender;
    private String birthdate;
    private Date joinDate;
}
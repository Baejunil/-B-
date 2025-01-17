package com.example.backend.dto;

import java.util.Date;

public class UserDto {
    private String userId;
    private String email;
    private String password;
    private String name;
    private Date birthDate;
    private String gender;

    // Constructors, Getters, and Setters
    public UserDto() {}

    public UserDto(String userId, String email, String password, String name, Date birthDate, String gender) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    // Getters
    public String getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public Date getBirthDate() { return birthDate; }
    public String getGender() { return gender; }

    // Setters
    public void setUserId(String userId) { this.userId = userId; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setName(String name) { this.name = name; }
    public void setBirthDate(Date birthDate) { this.birthDate = birthDate; }
    public void setGender(String gender) { this.gender = gender; }
}

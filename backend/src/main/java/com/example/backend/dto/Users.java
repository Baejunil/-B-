package com.example.backend.dto;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Users {

    @Id
    private String userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;

    @Temporal(TemporalType.DATE)
    private Date joinDate;

    // 기본 생성자
    public Users() {
        this.joinDate = new Date(); // 기본 생성자에서 joinDate 초기화
    }

    // Getter, Setter
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Date getJoinDate() { return joinDate; }
    public void setJoinDate(Date joinDate) { this.joinDate = joinDate; }
}
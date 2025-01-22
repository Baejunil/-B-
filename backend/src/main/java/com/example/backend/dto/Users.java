package com.example.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Users {

    @Id
    private String userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username; // 수정: username 필드 추가

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private Date birthdate;

    private Date joinDate; // 자동 생성 가능
}

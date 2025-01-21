package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SignupRequest {
    private String userId;
    private String password;
    private String confirmPassword; // 비밀번호 확인용
    private String email;
    private String name; // 이름
    private Date birthdate;
    private String gender;
    private Date joinDate; // 추가된 필드
}

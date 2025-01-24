package com.example.backend.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
	@NotBlank(message = "아이디는 필수 입력 항목입니다.")
	private String userId;

	@NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
	private String password;private String confirmPassword; // 비밀번호 확인용
    private String email;
    private String name; // 이름
    private Date birthdate;
    private String gender;
    private Date joinDate;
}
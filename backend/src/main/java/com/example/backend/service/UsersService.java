package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Users registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByUserId(signupRequest.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        Users user = new Users();
        user.setUserId(signupRequest.getUserId());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setEmail(signupRequest.getEmail());
        user.setUsername(signupRequest.getName());
        user.setGender(signupRequest.getGender());
        user.setBirthdate(signupRequest.getBirthdate());
        user.setJoinDate(new Date()); // 서버에서 현재 시간 설정
        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Users user = userRepository.findByUserId(loginRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디가 존재하지 않습니다."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return new LoginResponse(true, "로그인 성공", user.getUserId());
    }

    public Users getUserById(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }
}

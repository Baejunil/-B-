package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // 회원가입
    public String registerUser(SignupRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return "이미 존재하는 이메일입니다.";
        }

        User user = new User();
        user.setUserId(request.getUserId());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setUsername(request.getUsername());
        user.setStatus("active");
        user.setJoinDate(LocalDate.now());

        userRepository.save(user);
        return "회원가입이 완료되었습니다.";
    }

    // 로그인
    public String login(LoginRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent() && user.get().getPassword().equals(request.getPassword())) {
            return "로그인 성공";
        }
        return "아이디 또는 비밀번호가 잘못되었습니다.";
    }

    // 비밀번호 찾기
    public String findPassword(ForgotPasswordRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        return user.map(User::getPassword).orElse("이메일이 존재하지 않습니다.");
    }
}


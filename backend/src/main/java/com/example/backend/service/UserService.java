package com.example.backend.service;

import com.example.backend.dto.Users;
import com.example.backend.repository.UserRepository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(Users user) {
        if (userRepository.existsByUserId(user.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

   
        user.setJoinDate(new Date()); // 가입일 자동 설정
        userRepository.save(user); // 데이터베이스 저장
    }

    public boolean authenticate(String userId, String rawPassword) {
        Users user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

        // 입력된 비밀번호와 DB 비밀번호 비교
        if (!rawPassword.equals(user.getPassword())) { 
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return true;
    }
}


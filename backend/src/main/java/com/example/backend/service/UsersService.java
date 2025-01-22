package com.example.backend.service;

import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.repository.UsersRepository;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByUserId(signupRequest.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        Users user = new Users();
        user.setUserId(signupRequest.getUserId());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // 비밀번호 암호화
        user.setEmail(signupRequest.getEmail());
        user.setUsername(signupRequest.getName()); // name → username 매핑
        user.setBirthdate(signupRequest.getBirthdate());
        user.setGender(signupRequest.getGender());
        user.setJoinDate(new Date()); // 가입일 자동 설정

        userRepository.save(user);
    }


    public boolean authenticate(String userId, String rawPassword) {
        Users user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

        // 입력된 비밀번호와 암호화된 비밀번호 비교
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return true; // 인증 성공
    }
    public Users getUserById(String userId) {
        Optional<Users> user = userRepository.findByUserId(userId);
        return user.orElseThrow(() -> 
            new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다.")
        );
    }
}
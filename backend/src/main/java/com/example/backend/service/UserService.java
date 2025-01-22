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

        // 입력된 비밀번호와 암호화된 비밀번호 비교
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return true; // 인증 성공
    }

    // 아이디 찾기
    public String findUserIdByEmail(String email) {
    	Users user = userRepository.findByEmail(email)
    			.orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 사용자가 존재하지 않습니다."));
    	return user.getUserId();
	}
    
    // 비밀번호 찾기
    public String findPasswordByUserIdAndEmail(String userId, String email) {
        Users user = userRepository.findByUserIdAndEmail(userId, email)
                .orElseThrow(() -> new IllegalArgumentException("아이디와 이메일이 일치하는 사용자가 없습니다."));

        return user.getPassword(); // MySQL에 저장된 비밀번호 반환
    }

    // 이메일로 사용자 인증 (추가)
    public void validateUserEmail(String userId, String email) {
        Users user = userRepository.findByUserIdAndEmail(userId, email)
                .orElseThrow(() -> new IllegalArgumentException("아이디와 이메일이 일치하지 않습니다."));
    }

    // 새 비밀번호 설정 (추가)
    public void resetPassword(String userId, String newPassword) {
        Users user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
   




package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 아이디 찾기
    public String findUserIdByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get().getUserId();
        } else {
            throw new IllegalArgumentException("등록된 이메일이 없습니다.");
        }
    }

    // 비밀번호 찾기 (임시 비밀번호 발급)
    public String resetPassword(String userId, String email) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent() && userOptional.get().getEmail().equals(email)) {
            // 임시 비밀번호 생성
            String temporaryPassword = UUID.randomUUID().toString().substring(0, 8);
            User user = userOptional.get();
            user.setPassword(temporaryPassword); // 임시 비밀번호 설정 (추후 암호화 가능)
            userRepository.save(user);

            // TODO: 이메일로 임시 비밀번호 전송 (이메일 서비스 추가 필요)
            return "임시 비밀번호가 이메일로 전송되었습니다.";
        } else {
            throw new IllegalArgumentException("아이디와 이메일이 일치하지 않습니다.");
        }
    }
}



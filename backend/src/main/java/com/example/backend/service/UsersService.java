package com.example.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.Users;
import com.example.backend.repository.UsersRepository;
import com.example.backend.security.JwtProvider;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    private final JwtProvider jwtProvider;

    public UsersService(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    public LoginResponse login(LoginRequest req) {
        Optional<Users> userOpt = Optional.ofNullable(usersRepository.findByUserId(req.getUserId()));
        if (userOpt.isEmpty()) {
            return new LoginResponse(false, "존재하지 않는 아이디입니다.", null);
        }

        Users user = userOpt.get();
        if (!user.getPassword().equals(req.getPassword())) {
            return new LoginResponse(false, "비밀번호가 일치하지 않습니다.", null);
        }

        // JWT 토큰 생성
        String token = jwtProvider.createToken(user.getUserId());

        return new LoginResponse(true, "로그인 성공", token);
    }

    // 사용자 ID로 사용자 정보 조회 메서드 추가
    public Users getUserById(String userId) {
        return usersRepository.findByUserId(userId);
    }
}

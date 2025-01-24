package com.example.backend.service;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.MiniHome;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.repository.MiniHomeRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.security.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsersService {

    private final UsersRepository userRepository;
    private final MiniHomeRepository minihomeRepository; // 의존성 주입
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    /**
     * 회원가입 처리
     */
    public void registerUser(SignupRequest signupRequest) {
        // 아이디 중복 검사
        if (userRepository.existsByUserId(signupRequest.getUserId())) {
            log.error("이미 존재하는 아이디입니다: {}", signupRequest.getUserId());
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 사용자 생성 및 저장
        Users user = new Users();
        user.setUserId(signupRequest.getUserId());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // 비밀번호 암호화
        user.setEmail(signupRequest.getEmail());
        user.setUsername(signupRequest.getName());
        user.setBirthdate(signupRequest.getBirthdate());
        user.setGender(signupRequest.getGender());
        user.setJoinDate(signupRequest.getJoinDate()); // 가입 날짜 자동 설정
        userRepository.save(user);

        log.info("사용자 저장 완료: {}", user.getUserId());

        // 미니홈 생성 및 저장
        MiniHome minihome = new MiniHome();
        minihome.setBackground("환영합니다.");
        minihome.setDescription(signupRequest.getUserId() + "의 미니홈피입니다.");
        minihome.setUserId(signupRequest.getUserId());
        minihome.setCreatedDate(LocalDateTime.now()); // 생성 날짜 설정

        minihomeRepository.save(minihome);

        log.info("미니홈 저장 완료: {}", minihome.getUserId());
    }

    /**
     * 로그인 및 JWT 생성
     */
    public String loginAndGenerateToken(LoginRequest loginRequest) {
        Optional<Users> userOpt = userRepository.findByUserId(loginRequest.getUserId());
        if (userOpt.isEmpty()) {
            log.error("존재하지 않는 사용자입니다: {}", loginRequest.getUserId());
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }

        Users user = userOpt.get();

        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            log.error("비밀번호 불일치: {}", loginRequest.getUserId());
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }

        // JWT 생성 및 반환
        String token = jwtProvider.generateToken(user.getUserId());
        log.info("JWT 생성 완료: {}", user.getUserId());
        return token;
    }

    /**
     * 사용자 ID로 사용자 정보 조회
     */
    public Users getUserById(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    log.error("사용자를 찾을 수 없습니다: {}", userId);
                    return new IllegalArgumentException("해당 사용자를 찾을 수 없습니다.");
                });
    }
}
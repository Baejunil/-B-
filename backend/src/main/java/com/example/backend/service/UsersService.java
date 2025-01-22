package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.repository.UsersRepository;
import com.example.backend.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    /**
     * 회원가입 처리
     */
    public void registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByUserId(signupRequest.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        Users user = new Users();
        user.setUserId(signupRequest.getUserId());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // 비밀번호 암호화
        user.setEmail(signupRequest.getEmail());
        user.setUsername(signupRequest.getName());
        user.setBirthdate(signupRequest.getBirthdate());
        user.setGender(signupRequest.getGender());

        userRepository.save(user);
    }

    /**
     * 로그인 및 JWT 생성
     */
    public String loginAndGenerateToken(LoginRequest loginRequest) {
    	
        Optional<Users> userOpt = userRepository.findByUserId(loginRequest.getUserId());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }
        Users user = userOpt.get();
        
        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {      	
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }
        
        // JWT 생성
        return jwtProvider.generateToken(user.getUserId());
    }

    /**
     * 사용자 ID로 사용자 정보 조회
     */
    public Users getUserById(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
    }
}

package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.security.JwtProvider;
import com.example.backend.service.UsersService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UsersService userService;
    private final JwtProvider jwtProvider;

    /**
     * 회원가입
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            log.info("회원가입 요청: {}", signupRequest.getUserId());
            userService.registerUser(signupRequest);
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        } catch (Exception e) {
            log.error("회원가입 실패", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            log.info("로그인 요청: {}", loginRequest.getUserId());
            String token = userService.loginAndGenerateToken(loginRequest);
            return ResponseEntity.ok(Map.of("message", "로그인 성공", "token", token));
        } catch (Exception e) {
            log.error("로그인 실패", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * 현재 사용자 조회 (JWT 기반)
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            // Bearer 제거
            String jwt = token.replace("Bearer ", "");

            // validateToken() → Jws<Claims> 반환
            Jws<Claims> claimsJws = jwtProvider.validateToken(jwt);

            // Claims에서 userId 추출
            String userId = claimsJws.getBody().getSubject();

            // userId로 DB 조회
            Users user = userService.getUserById(userId);
            return ResponseEntity.ok(Map.of("status", "success", "data", user));
        } catch (Exception e) {
            log.error("현재 사용자 조회 실패", e);
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * [추가] 전체 사용자 목록 조회
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<Users> allUsers = userService.getAllUsers();
            return ResponseEntity.ok(allUsers);
        } catch (Exception e) {
            log.error("전체 사용자 조회 실패", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

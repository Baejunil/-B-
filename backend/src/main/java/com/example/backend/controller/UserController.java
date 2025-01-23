package com.example.backend.controller;

import com.example.backend.dto.Users;
import com.example.backend.dto.LoginRequest;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService; // 서비스 클래스 주입

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Users user) {
        try {
            userService.registerUser(user); // 회원가입 로직 실행
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); // 에러 메시지 반환
        }
    }

    // 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isAuthenticated = userService.authenticate(
                    loginRequest.getUserId(),
                    loginRequest.getPassword()
            );
            if (isAuthenticated) {
                return ResponseEntity.ok(Map.of("message", "로그인 성공"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "로그인 실패"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); // 에러 메시지 반환
        }
    }
    // 아이디찾기 API
    @PostMapping("/find-id")
    public ResponseEntity<?> findUserId(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            String userId = userService.findUserIdByEmail(email);
            return ResponseEntity.ok(Map.of("userId", userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 비밀번호 찾기 API 추가
    @PostMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String email = request.get("email");

        try {
            userService.validateUserEmail(userId, email);
            return ResponseEntity.ok(Map.of("message", "인증 성공! 비밀번호를 재설정하세요."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 새 비밀번호 설정 API 추가
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String newPassword = request.get("newPassword");

        try {
            userService.resetPassword(userId, newPassword);
            return ResponseEntity.ok(Map.of("message", "비밀번호가 성공적으로 재설정되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

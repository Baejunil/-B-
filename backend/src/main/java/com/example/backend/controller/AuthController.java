package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.security.JwtProvider;
import com.example.backend.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UsersService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            userService.registerUser(signupRequest); // SignupRequest 전달
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isAuthenticated = userService.authenticate(
                    loginRequest.getUserId(), loginRequest.getPassword()
            );

            if (isAuthenticated) {
                return ResponseEntity.ok(Map.of("message", "로그인 성공"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "로그인 실패"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            if (!jwtProvider.validateToken(jwt)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("status", "error", "error", "유효하지 않은 토큰입니다.")
                );
            }
            String userId = jwtProvider.getUserIdFromToken(jwt);
            Users user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of("status", "error", "error", "사용자를 찾을 수 없습니다.")
                );
            }
            return ResponseEntity.ok(Map.of("status", "success", "data", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("status", "error", "error", "사용자 정보를 가져오는 중 오류가 발생했습니다.")
            );
        }
    }
}

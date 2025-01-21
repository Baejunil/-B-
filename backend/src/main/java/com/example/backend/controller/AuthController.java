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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = userService.login(loginRequest);
            return ResponseEntity.ok(Map.of("status", "success", "data", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("status", "error", "error", e.getMessage())
            );
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        if (signupRequest.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "error", "비밀번호는 최소 6자 이상이어야 합니다.")
            );
        }

        try {
            Users savedUser = new Users(); // 저장된 사용자 반환
            SignupRequest response = new SignupRequest();
            response.setUserId(savedUser.getUserId());
            response.setEmail(savedUser.getEmail());
            response.setName(savedUser.getUsername());
            response.setBirthdate(savedUser.getBirthdate());
            response.setGender(savedUser.getGender());
            response.setJoinDate(savedUser.getJoinDate());

            return ResponseEntity.ok(Map.of("status", "success", "data", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "error", e.getMessage())
            );
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

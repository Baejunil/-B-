package com.example.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.Users;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Users user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

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
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

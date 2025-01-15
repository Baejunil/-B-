package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.PasswordResetRequest;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        userService.createUser(userDto);
        return ResponseEntity.ok("User registered successfully!");
    }

    // 아이디 찾기
    @GetMapping("/find-id")
    public ResponseEntity<String> findUserId(@RequestParam String email) {
        Optional<String> userId = userService.findUserIdByEmail(email);
        return userId.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.badRequest().body("User ID not found"));
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
        boolean success = userService.resetPassword(request.getUserId(), request.getEmail(), request.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid User ID or Email");
        }
    }
}


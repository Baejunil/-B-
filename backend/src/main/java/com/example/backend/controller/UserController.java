package com.example.backend.controller;

import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody UserRequest.FindId request) {
        try {
            String userId = userService.findUserIdByEmail(request.getEmail());
            return ResponseEntity.ok(new UserResponse.FindIdResponse(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // 비밀번호 찾기 (임시 비밀번호 발급)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserRequest.ResetPassword request) {
        try {
            String message = userService.resetPassword(request.getUserId(), request.getEmail());
            return ResponseEntity.ok(new UserResponse.ResetPasswordResponse(message));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // 내부 클래스: 에러 응답 구조
    private static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}


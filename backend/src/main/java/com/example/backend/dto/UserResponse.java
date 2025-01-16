package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class UserResponse {
    @Data
    @AllArgsConstructor
    public static class FindIdResponse {
        private String userId;
    }

    @Data
    @AllArgsConstructor
    public static class ResetPasswordResponse {
        private String message;
    }
}

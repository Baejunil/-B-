package com.example.backend.dto;

import lombok.Data;

public class UserRequest {
    @Data
    public static class FindId {
        private String email;
    }

    @Data
    public static class ResetPassword {
        private String userId;
        private String email;
    }
}

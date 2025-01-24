package com.example.backend.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class MiniHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mini_home_id")
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId; // 유저 ID와 연결

    private String background; // 배경 이미지 URL
    private String description; // 미니홈 설명

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now(); // 생성일
}
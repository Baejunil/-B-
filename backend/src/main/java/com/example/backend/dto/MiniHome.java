package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class MiniHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mini_home_id") // 데이터베이스의 컬럼 이름과 매핑
    private Long id;

    @Column(name = "user_id",nullable = false)
    private String userId;

    private String background;
    private String description;

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
}

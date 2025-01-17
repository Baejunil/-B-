package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class MiniHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    private String background;
    private String description;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
}

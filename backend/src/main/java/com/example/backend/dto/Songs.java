package com.example.backend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Songs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long songId;

    private String title;

    private String artist;

    private String album;

    private int playCount = 0;
}

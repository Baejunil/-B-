package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dto.MiniHome;

@Repository
public interface MiniHomeRepository extends JpaRepository<MiniHome, Long> {
    MiniHome findByUserId(String userId); // 수정된 메서드 이름
}

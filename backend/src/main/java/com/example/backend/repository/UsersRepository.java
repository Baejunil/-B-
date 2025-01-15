package com.example.backend.repository;

import com.example.backend.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String> {
    
    // userId에 대한 중복 검사 메서드는 기본 제공 (existsById)
    
    // 이메일 중복 검사 메서드
    boolean existsByEmail(String email);
}

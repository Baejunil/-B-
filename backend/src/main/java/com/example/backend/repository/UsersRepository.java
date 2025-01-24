package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.Users;

public interface UsersRepository extends JpaRepository<Users, String> {
	Optional<Users> findByUserId(String userId);
    
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email); // 이메일 중복 체크
}
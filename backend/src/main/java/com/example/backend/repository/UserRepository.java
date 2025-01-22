package com.example.backend.repository;

import com.example.backend.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByUserId(String userId);
    boolean existsByUserId(String userId);
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUserIdAndEmail(String userId, String email);
}


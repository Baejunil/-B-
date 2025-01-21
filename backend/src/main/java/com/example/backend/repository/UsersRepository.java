package com.example.backend.repository;

import com.example.backend.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    Optional<Users> findByUserId(String userId);
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email); // 이메일 중복 체크
}

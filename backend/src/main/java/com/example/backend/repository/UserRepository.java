package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.Users;

public interface UserRepository extends JpaRepository<Users, String> {
    Users findByUserId(String userId);
}
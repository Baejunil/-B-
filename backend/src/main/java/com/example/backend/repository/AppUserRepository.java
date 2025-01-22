package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.Users;

public interface AppUserRepository extends JpaRepository<Users, String> {
}
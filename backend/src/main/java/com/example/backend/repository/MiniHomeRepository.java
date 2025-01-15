// MiniHomeRepository.java
package com.example.backend.repository;

import com.example.backend.dto.MiniHome;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MiniHomeRepository extends JpaRepository<MiniHome, Long> {
}
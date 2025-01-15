// SongsRepository.java
package com.example.backend.repository;

import com.example.backend.dto.Songs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongsRepository extends JpaRepository<Songs, Long> {
}
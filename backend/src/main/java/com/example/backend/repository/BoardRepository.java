// BoardRepository.java
package com.example.backend.repository;

import com.example.backend.dto.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
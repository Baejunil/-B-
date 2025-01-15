// DiaryRepository.java
package com.example.backend.repository;

import com.example.backend.dto.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
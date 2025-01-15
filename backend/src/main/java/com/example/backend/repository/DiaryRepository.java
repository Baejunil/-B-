package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
	Diary findByDiaryId(long diaryId);
}

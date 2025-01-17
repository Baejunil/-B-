package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.DiaryComment;



public interface DiaryCommentRepository extends JpaRepository<DiaryComment, Long> {
	List<DiaryComment> findByDiaryDiaryId(Long diaryId);
}

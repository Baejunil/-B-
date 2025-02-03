package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.BoardComment;



public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
	List<BoardComment> findByPost_PostId(Long postId);
}

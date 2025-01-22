package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.dto.Board;



public interface BoardRepository extends JpaRepository<Board, Long>{
	Board findByPostId(long postId);
}

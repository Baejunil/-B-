package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.Board;
import com.example.backend.repository.BoardRepository;

@Service
public class BoardService {
	 @Autowired
	 private BoardRepository boardRepository;
	 
	 // 게시판 생성
	 public Board createBoard(Board board) {
		 return boardRepository.save(board);
	 }
}

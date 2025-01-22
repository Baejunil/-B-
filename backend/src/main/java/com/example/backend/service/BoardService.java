package com.example.backend.service;

import java.util.List;

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
	 
	 // 게시판 조회
	 public List<Board> getAllBoards(){
		 return boardRepository.findAll();
		 
	 }
	 
	 // 특정 게시판 조회
	 public Board getBoard(Long id) {
		 	Board board = boardRepository.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
		 	board.setViewCount(board.getViewCount() + 1);
	        return boardRepository.save(board);
	    }
}

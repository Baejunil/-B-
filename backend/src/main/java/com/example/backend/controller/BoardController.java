package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Board;
import com.example.backend.service.BoardService;


@RestController
@RequestMapping("/api/board")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@PostMapping
	public ResponseEntity<Board> createBoard(@RequestBody Board board){
		Board createdBoard = boardService.createBoard(board);
		return ResponseEntity.ok(createdBoard);
	}
	
	@GetMapping
	public List<Board> getAllBoards(){
		
		return boardService.getAllBoards();
	}
	
}

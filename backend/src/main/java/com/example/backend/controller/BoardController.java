package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.Board;
import com.example.backend.service.BoardService;

@RestController
@RequestMapping("/api/board")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
    @Autowired
    private BoardService boardService;

    // 게시글 생성 (POST 요청)
    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.createBoard(board);
        return ResponseEntity.ok(createdBoard);
    }

    // 페이징을 적용한 게시글 목록 조회
    @GetMapping
    public ResponseEntity<Page<Board>> getAllBoards(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) { // 기본 페이지 크기 5개
        Page<Board> boards = boardService.getAllBoards(page, size);
        return ResponseEntity.ok(boards);
    }

    // 특정 게시글 조회
    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable Long id) {
        Board board = boardService.getBoard(id);
        return ResponseEntity.ok(board);
    }
}

package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UsersRepository usersRepository;

    // 게시글 목록 조회
    @GetMapping("/boards")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return ResponseEntity.ok(boards);
    }

    // 게시글 상세 조회
    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable Long id) {
        Optional<Board> board = boardRepository.findById(id);
        return board.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 게시글 작성
    @PostMapping("/boards")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        board.setCreatedDate(new java.util.Date());
        Board savedBoard = boardRepository.save(board);
        return ResponseEntity.ok(savedBoard);
    }

    // 게시글 수정
    @PutMapping("/boards/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard) {
        Optional<Board> boardOptional = boardRepository.findById(id);
        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();
            board.setTitle(updatedBoard.getTitle());
            board.setContent(updatedBoard.getContent());
            Board savedBoard = boardRepository.save(board);
            return ResponseEntity.ok(savedBoard);
        }
        return ResponseEntity.notFound().build();
    }

    // 게시글 삭제
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        if (boardRepository.existsById(id)) {
            boardRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Board;
import com.example.backend.dto.BoardComment;

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
    
    // 댓글 작성 (POST 요청)
    @PostMapping("/{id}/comments")
    public ResponseEntity<BoardComment> createComment(@PathVariable Long boardId, @RequestBody BoardComment comment) {
    	BoardComment createdComment = boardService.createComment(boardId, comment);
        return ResponseEntity.ok(createdComment);
    }

    // 댓글 조회 (GET 요청)
    @GetMapping("/{id}/comments")
    public List<BoardComment> getComments(@PathVariable Long postId) {
        return boardService.getComments(postId);
    }

    // 댓글 수정 (PUT 요청)
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<BoardComment> updateComment(@PathVariable Long commentId, @RequestBody BoardComment comment) {
    	BoardComment updatedComment = boardService.updateComment(commentId, comment);
        return updatedComment != null ? ResponseEntity.ok(updatedComment) : ResponseEntity.notFound().build();
    }

    // 댓글 삭제 (DELETE 요청)
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
    	boardService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}

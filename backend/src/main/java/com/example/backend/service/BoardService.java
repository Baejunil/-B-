package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.backend.dto.Board;
import com.example.backend.dto.BoardComment;

import com.example.backend.repository.BoardCommentRepository;
import com.example.backend.repository.BoardRepository;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardCommentRepository boardCommentRepository;

    // 게시판 생성
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    // 페이징을 포함한 게시판 목록 조회
    public Page<Board> getAllBoards(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return boardRepository.findAll(pageable);
    }

    // 특정 게시글 조회 (조회수 증가 포함)
    public Board getBoard(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        board.setViewCount(board.getViewCount() + 1);
        return boardRepository.save(board);
    }
    
    // 댓글 작성 (Create)
    public BoardComment createComment(Long postId, BoardComment comment) {
        Board board = boardRepository.findById(postId).orElse(null);
        if (board != null) {
            comment.setPost(board);
            return boardCommentRepository.save(comment);
        }
        return null;
    }

    // 댓글 조회 (Read)
    public List<BoardComment> getComments(Long postId) {
        return boardCommentRepository.findByPost_PostId(postId);
    }

    // 댓글 수정 (Update)
    public BoardComment updateComment(Long commentId, BoardComment comment) {
        if (boardCommentRepository.existsById(commentId)) {
            comment.setBoardCommentId(commentId);
            return boardCommentRepository.save(comment);
        }
        return null;
    }

    // 댓글 삭제 (Delete)
    public void deleteComment(Long commentId) {
    	boardCommentRepository.deleteById(commentId);
    }
}

package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
}

package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Diary;
import com.example.backend.dto.DiaryComment;
import com.example.backend.service.DiaryService;
@RestController
@RequestMapping("/api/diary")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
    @Autowired
    private DiaryService diaryService;

    // 일기 생성 (POST 요청)
    @PostMapping
    public ResponseEntity<Diary> createDiary(@RequestBody Diary diary) {
        Diary createdDiary = diaryService.createDiary(diary);
        return ResponseEntity.status(201).body(createdDiary); // 201 Created 상태 반환
    }

    // 모든 일기 조회 (GET 요청)
    @GetMapping
    public ResponseEntity<List<Diary>> getAllDiaries() {
        List<Diary> diaries = diaryService.getAllDiaries();
        return diaries.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(diaries);
    }

    // 특정 일기 조회 (GET 요청)
    @GetMapping("/{id}")
    public ResponseEntity<Object> getDiary(@PathVariable Long id) {
        try {
            Diary diary = diaryService.getDiaryById(id);
            return ResponseEntity.ok(diary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Diary not found", "message", e.getMessage())
            );
        }
    }

    // 일기 수정 (PUT 요청)
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateDiary(@PathVariable Long id, @RequestBody Diary diary) {
        try {
            Diary updatedDiary = diaryService.updateDiary(id, diary);
            return ResponseEntity.ok(updatedDiary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Diary not found", "message", e.getMessage())
            );
        }
    }

    // 일기 삭제 (DELETE 요청)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id) {
        diaryService.deleteDiary(id);
        return ResponseEntity.noContent().build();
    }

    // 댓글 작성 (POST 요청)
    @PostMapping("/{diaryId}/comments")
    public ResponseEntity<Object> createComment(@PathVariable Long diaryId, @RequestBody DiaryComment comment) {
        try {
            DiaryComment createdComment = diaryService.createComment(diaryId, comment);
            return ResponseEntity.status(201).body(createdComment); // 201 Created
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(
                Map.of("error", "Invalid request", "message", e.getMessage())
            );
        }
    }

    // 댓글 조회 (GET 요청)
    @GetMapping("/{diaryId}/comments")
    public ResponseEntity<List<DiaryComment>> getComments(@PathVariable Long diaryId) {
        List<DiaryComment> comments = diaryService.getComments(diaryId);
        return comments.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(comments);
    }

    // 댓글 수정 (PUT 요청)
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Object> updateComment(@PathVariable Long commentId, @RequestBody DiaryComment comment) {
        try {
            DiaryComment updatedComment = diaryService.updateComment(commentId, comment);
            return ResponseEntity.ok(updatedComment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Comment not found", "message", e.getMessage())
            );
        }
    }

    // 댓글 삭제 (DELETE 요청)
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        diaryService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}

package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.Diary;
import com.example.backend.dto.DiaryComment;
import com.example.backend.repository.DiaryCommentRepository;
import com.example.backend.repository.DiaryRepository;

@Service
public class DiaryService {
    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private DiaryCommentRepository diaryCommentRepository;

    // 일기 생성 (Create)
    public Diary createDiary(Diary diary) {
        return diaryRepository.save(diary);
    }

    // 모든 일기 조회 (Read)
    public List<Diary> getAllDiaries() {
        return diaryRepository.findAll();
    }

    // 특정 일기 조회 (Read)
    public Diary getDiaryById(Long diaryId) { // 추가
        return diaryRepository.findById(diaryId).orElse(null);
    }

    // 일기 수정 (Update)
    public Diary updateDiary(Long diaryId, Diary diary) {
        if (diaryRepository.existsById(diaryId)) {
            diary.setDiaryId(diaryId);
            return diaryRepository.save(diary);
        }
        return null;
    }

    // 일기 삭제 (Delete)
    public void deleteDiary(Long diaryId) {
        diaryRepository.deleteById(diaryId);
    }

    // 댓글 작성 (Create)
    public DiaryComment createComment(Long diaryId, DiaryComment comment) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        if (diary == null) {
            throw new IllegalArgumentException("Diary not found for id: " + diaryId); // 수정
        }
        comment.setDiary(diary);
        return diaryCommentRepository.save(comment);
    }

    // 댓글 조회 (Read)
    public List<DiaryComment> getComments(Long diaryId) {
        return diaryCommentRepository.findByDiaryDiaryId(diaryId);
    }

    // 댓글 수정 (Update)
    public DiaryComment updateComment(Long commentId, DiaryComment comment) {
        if (diaryCommentRepository.existsById(commentId)) {
            comment.setDiaryCommentId(commentId);
            return diaryCommentRepository.save(comment);
        }
        return null;
    }

    // 댓글 삭제 (Delete)
    public void deleteComment(Long commentId) {
        diaryCommentRepository.deleteById(commentId);
    }
}

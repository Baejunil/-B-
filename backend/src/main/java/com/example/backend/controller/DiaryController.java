package com.example.backend.controller;

import com.example.backend.dto.Diary;
import com.example.backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    // 다이어리 목록 조회
    @GetMapping
    public ResponseEntity<List<Diary>> getAllDiaries() {
        List<Diary> diaries = diaryRepository.findAll();
        return ResponseEntity.ok(diaries);
    }

    // 다이어리 작성
    @PostMapping
    public ResponseEntity<Diary> createDiary(@RequestBody Diary diary) {
        diary.setCreatedDate(new java.util.Date());
        Diary savedDiary = diaryRepository.save(diary);
        return ResponseEntity.ok(savedDiary);
    }

    // 다이어리 수정
    @PutMapping("/{id}")
    public ResponseEntity<Diary> updateDiary(@PathVariable Long id, @RequestBody Diary updatedDiary) {
        Optional<Diary> diaryOptional = diaryRepository.findById(id);
        if (diaryOptional.isPresent()) {
            Diary diary = diaryOptional.get();
            diary.setTitle(updatedDiary.getTitle());
            diary.setContent(updatedDiary.getContent());
            Diary savedDiary = diaryRepository.save(diary);
            return ResponseEntity.ok(savedDiary);
        }
        return ResponseEntity.notFound().build();
    }

    // 다이어리 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id) {
        if (diaryRepository.existsById(id)) {
            diaryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
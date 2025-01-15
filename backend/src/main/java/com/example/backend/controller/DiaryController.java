package com.example.backend.controller;

import java.util.List;

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
        return ResponseEntity.ok(createdDiary);
    }

    // 모든 일기 조회 (GET 요청)
    @GetMapping
    public List<Diary> getAllDiaries() {
        return diaryService.getAllDiaries();
    }

    // 특정 일기 조회 (GET 요청)
    @GetMapping("/{id}")
    public ResponseEntity<Diary> getDiary(@PathVariable Long id) {
        Diary diary = diaryService.getAllDiaries().stream()
                                  .filter(d -> d.getDiaryId().equals(id))
                                  .findFirst()
                                  .orElse(null);
        return diary != null ? ResponseEntity.ok(diary) : ResponseEntity.notFound().build();
    }

    // 일기 수정 (PUT 요청)
    @PutMapping("/{id}")
    public ResponseEntity<Diary> updateDiary(@PathVariable Long id, @RequestBody Diary diary) {
        Diary updatedDiary = diaryService.updateDiary(id, diary);
        return updatedDiary != null ? ResponseEntity.ok(updatedDiary) : ResponseEntity.notFound().build();
    }

    // 일기 삭제 (DELETE 요청)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id) {
        diaryService.deleteDiary(id);
        return ResponseEntity.noContent().build();
    }
}

package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.Diary;
import com.example.backend.repository.DiaryRepository;

@Service
public class DiaryService {
	
	 @Autowired
	    private DiaryRepository diaryRepository;

	    // 일기 생성 (Create)
	    public Diary createDiary(Diary diary) {
	        return diaryRepository.save(diary);
	    }

	    // 모든 일기 조회 (Read)
	    public List<Diary> getAllDiaries() {
	        return diaryRepository.findAll();
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
}

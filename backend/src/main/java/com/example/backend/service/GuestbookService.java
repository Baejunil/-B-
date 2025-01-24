package com.example.backend.service;

import com.example.backend.dto.Guestbook;
import com.example.backend.repository.GuestbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest; // 추가
import org.springframework.data.domain.Sort;      // 정렬 옵션
import org.springframework.stereotype.Service;

@Service
public class GuestbookService {

    @Autowired
    private GuestbookRepository guestbookRepository;

    // 기존의 모든 방명록 조회 (페이지네이션)
    public Page<Guestbook> getGuestbookEntries(int page, int size) {
        return guestbookRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdDate").descending())
        );
    }

    // **추가**: 자기 자신의 방명록만 가져오기
    public Page<Guestbook> getGuestbookEntriesByUserId(String userId, int page, int size) {
        return guestbookRepository.findByUserId(
            userId, PageRequest.of(page, size, Sort.by("createdDate").descending())
        );
    }

    // 방명록 항목 추가
    public Guestbook addGuestbookEntry(Guestbook guestbook) {
        return guestbookRepository.save(guestbook);
    }
    
    public void deleteEntry(Long guestbookId, String currentUserId) {
        // 1) DB에서 해당 guestbookId 조회
        Guestbook entry = guestbookRepository.findById(guestbookId)
                .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));

        // 2) 작성자와 현재 로그인 유저가 같은지 확인
        //    예) userId = 방명록 주인, guestId = 작성자 로직은 각자에 맞춰 수정
        if (!entry.getUserId().equals(currentUserId)) {
            // 만약 "작성자만 삭제"가 아니라 "방명록 주인만 삭제"로 바꾸고 싶다면 userId 체크
            throw new SecurityException("You are not the owner of this entry");
        }

        // 3) 삭제
        guestbookRepository.delete(entry);
    }

}

package com.example.backend.controller;

import com.example.backend.dto.Guestbook;
import com.example.backend.service.GuestbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/guestbook")
@CrossOrigin(origins = "http://localhost:3000")
public class GuestbookController {

    @Autowired
    private GuestbookService guestbookService;

    // --- 기존 코드 (전체 조회) ---
    @GetMapping
    public ResponseEntity<?> getAllGuestbookEntries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        var guestbookPage = guestbookService.getGuestbookEntries(page, size);
        if (guestbookPage.hasContent()) {
            return ResponseEntity.ok(guestbookPage.getContent());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // --- 추가: "내 방명록만" 조회 ---
    @GetMapping("/mine")
    public ResponseEntity<?> getMyGuestbookEntries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // 현재 로그인한 사용자의 ID 확인
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();

        var guestbookPage = guestbookService.getGuestbookEntriesByUserId(currentUserId, page, size);

        if (guestbookPage.hasContent()) {
            return ResponseEntity.ok(guestbookPage.getContent());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // 방명록 작성
    @PostMapping
    public ResponseEntity<Object> addGuestbookEntry(@RequestBody Guestbook guestbook) {
        try {
            // 유효성 검사
            if (guestbook.getMessage() == null || guestbook.getMessage().trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of("error", "Message is required"));
            }

            // 현재 로그인 사용자 ID (스프링 시큐리티)
            String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();

            // "내 방명록에 내가 작성" 시나리오라면 userId, guestId 모두 내 ID로 설정
            guestbook.setUserId(currentUserId);
            guestbook.setGuestId(currentUserId);

            guestbook.setCreatedDate(new Date());

            // DB 저장
            Guestbook createdEntry = guestbookService.addGuestbookEntry(guestbook);

            return ResponseEntity.status(201).body(createdEntry);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }
    @DeleteMapping("/{guestbookId}") // 삭제
    public ResponseEntity<?> deleteGuestbookEntry(@PathVariable Long guestbookId) {
        try {
            // 현재 로그인 유저 (JWT or SecurityContext 이용)
            String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
            
            // 삭제 로직
            guestbookService.deleteEntry(guestbookId, currentUserId);

            // 성공 시 200 OK
            return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
        } catch (SecurityException se) {
            // 권한 없음
            return ResponseEntity.status(403).body(Map.of("error", se.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            // 그 외 오류
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

}

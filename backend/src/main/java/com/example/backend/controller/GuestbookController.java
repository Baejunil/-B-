package com.example.backend.controller;

import com.example.backend.dto.Guestbook;
import com.example.backend.service.GuestbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/guestbook")
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class GuestbookController {

    @Autowired
    private GuestbookService guestbookService;

    // 방명록 목록 조회 (페이지네이션)
    @GetMapping
    public ResponseEntity<List<Guestbook>> getAllGuestbookEntries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Guestbook> guestbookEntries = guestbookService.getGuestbookEntries(page, size);
        return guestbookEntries.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(guestbookEntries);
    }

    // 방명록 작성
    @PostMapping
    public ResponseEntity<Object> addGuestbookEntry(@RequestBody Guestbook guestbook) {
        try {
            // 유효성 검사
            if (guestbook.getMessage() == null || guestbook.getMessage().trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of("error", "Message is required"));
            }
            guestbook.setCreatedDate(new Date());
            Guestbook createdEntry = guestbookService.addGuestbookEntry(guestbook);
            return ResponseEntity.status(201).body(createdEntry);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }
}

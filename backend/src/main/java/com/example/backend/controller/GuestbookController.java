package com.example.backend.controller;

import com.example.backend.dto.Guestbook;
import com.example.backend.repository.GuestbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/guestbooks")
public class GuestbookController {

    @Autowired
    private GuestbookRepository guestbookRepository;

    // 방명록 목록 조회
    @GetMapping
    public ResponseEntity<List<Guestbook>> getAllGuestbooks() {
        List<Guestbook> guestbooks = guestbookRepository.findAll();
        return ResponseEntity.ok(guestbooks);
    }

    // 방명록 작성
    @PostMapping
    public ResponseEntity<Guestbook> createGuestbook(@RequestBody Guestbook guestbook) {
        guestbook.setCreatedDate(new java.util.Date());
        Guestbook savedGuestbook = guestbookRepository.save(guestbook);
        return ResponseEntity.ok(savedGuestbook);
    }

    // 방명록 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuestbook(@PathVariable Long id) {
        if (guestbookRepository.existsById(id)) {
            guestbookRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
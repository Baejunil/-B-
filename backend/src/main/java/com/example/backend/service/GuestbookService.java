package com.example.backend.service;

import com.example.backend.dto.Guestbook;
import com.example.backend.repository.GuestbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestbookService {

    @Autowired
    private GuestbookRepository guestbookRepository;

    // 방명록 목록 조회
    public List<Guestbook> getGuestbookEntries(int page, int size) {
        return guestbookRepository.findAll()
                .stream()
                .skip((long) page * size)
                .limit(size)
                .toList();
    }

    // 방명록 항목 추가
    public Guestbook addGuestbookEntry(Guestbook guestbook) {
        return guestbookRepository.save(guestbook);
    }
}

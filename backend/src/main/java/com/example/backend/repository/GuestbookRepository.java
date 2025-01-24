package com.example.backend.repository;

import com.example.backend.dto.Guestbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
    // "방명록 소유자(userId)"가 특정 값인 레코드를 페이징 조회
    Page<Guestbook> findByUserId(String userId, Pageable pageable);
}

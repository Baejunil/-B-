// GuestbookRepository.java
package com.example.backend.repository;

import com.example.backend.dto.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
}
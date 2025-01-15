// FriendsRepository.java
package com.example.backend.repository;

import com.example.backend.dto.Friends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friends, Long> {
}
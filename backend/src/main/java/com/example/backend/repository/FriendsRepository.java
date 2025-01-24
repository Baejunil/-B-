package com.example.backend.repository;

import com.example.backend.dto.Friends;
import com.example.backend.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendsRepository extends JpaRepository<Friends, Long> {
    List<Friends> findByUser(Users user); // 특정 유저의 팔로우 리스트 조회
    Friends findByUserAndFriendUser(Users user, Users friendUser); // 팔로우 관계 확인
}

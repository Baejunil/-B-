package com.example.backend.controller;

import com.example.backend.dto.Friends;
import com.example.backend.repository.FriendsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

    @Autowired
    private FriendsRepository friendsRepository;

    // 친구 목록 조회
    @GetMapping
    public ResponseEntity<List<Friends>> getAllFriends() {
        List<Friends> friends = friendsRepository.findAll();
        return ResponseEntity.ok(friends);
    }

    // 친구 추가
    @PostMapping
    public ResponseEntity<Friends> addFriend(@RequestBody Friends friend) {
        friend.setCreatedDate(new java.util.Date());
        Friends savedFriend = friendsRepository.save(friend);
        return ResponseEntity.ok(savedFriend);
    }
}

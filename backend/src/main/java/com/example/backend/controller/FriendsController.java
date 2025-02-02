package com.example.backend.controller;

import com.example.backend.dto.FriendsRequest;
import com.example.backend.dto.Users;
import com.example.backend.dto.FollowRequest;
import com.example.backend.service.FriendsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendsController {
    private final FriendsService friendsService;

    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    /**
     * 전체 사용자 목록 조회
     */
    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return friendsService.getAllUsers();
    }

    /**
     * 특정 사용자의 친구 목록 조회
     */
    @GetMapping("/{userId}")
    public List<?> getFriends(@PathVariable String userId) {
        return friendsService.getFriendsByUser(userId);
    }

    /**
     * 팔로우 요청 (친구 신청)
     */
    @PostMapping("/request")
    public ResponseEntity<String> sendFriendRequest(@RequestBody FollowRequest request) {
        if (request.getUserId() == null || request.getFriendUserId() == null) {
            return ResponseEntity.badRequest().body("userId 또는 friendUserId가 비어있습니다.");
        }
        
        friendsService.sendFriendRequest(request.getUserId(), request.getFriendUserId());
        return ResponseEntity.ok("팔로우 요청을 보냈습니다.");
    }

    /**
     * 받은 팔로우 요청 목록 조회
     */
    @GetMapping("/pending/{userId}")
    public List<FriendsRequest> getPendingRequests(@PathVariable String userId) {
        return friendsService.getPendingRequests(userId);
    }

    /**
     * 팔로우 요청 수락
     */
    @PatchMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestParam Long requestId) {
        friendsService.acceptFriendRequest(requestId);
        return ResponseEntity.ok("팔로우 요청을 수락했습니다.");
    }

    /**
     * 팔로우 요청 거절
     */
    @DeleteMapping("/reject")
    public ResponseEntity<String> rejectFriendRequest(@RequestParam Long requestId) {
        friendsService.rejectFriendRequest(requestId);
        return ResponseEntity.ok("팔로우 요청을 거절했습니다.");
    }

    /**
     * 팔로우 취소 (친구 삭제)
     */
    @DeleteMapping("/unfollow")
    public ResponseEntity<String> unfollowUser(@RequestParam String userId, @RequestParam String friendUserId) {
        friendsService.unfollowUser(userId, friendUserId);
        return ResponseEntity.ok("언팔로우 성공");
    }
}

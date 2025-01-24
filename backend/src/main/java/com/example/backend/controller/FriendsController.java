package com.example.backend.controller;

import com.example.backend.dto.Users;
import com.example.backend.service.FriendsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
public class FriendsController {
    private final FriendsService friendsService;

    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return friendsService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public List<?> getFriends(@PathVariable String userId) {
        return friendsService.getFriendsByUser(userId);
    }

    @PostMapping("/follow")
    public void followUser(@RequestParam String userId, @RequestParam String friendUserId) {
        friendsService.followUser(userId, friendUserId);
    }

    @DeleteMapping("/unfollow")
    public void unfollowUser(@RequestParam String userId, @RequestParam String friendUserId) {
        friendsService.unfollowUser(userId, friendUserId);
    }
}

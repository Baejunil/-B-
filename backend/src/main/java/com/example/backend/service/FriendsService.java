package com.example.backend.service;

import com.example.backend.dto.Friends;
import com.example.backend.dto.Users;
import com.example.backend.repository.FriendsRepository;
import com.example.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final UsersRepository usersRepository;

    public FriendsService(FriendsRepository friendsRepository, UsersRepository usersRepository) {
        this.friendsRepository = friendsRepository;
        this.usersRepository = usersRepository;
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public List<Friends> getFriendsByUser(String userId) {
        Users user = usersRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return friendsRepository.findByUser(user);
    }

    public void followUser(String userId, String friendUserId) {
        Users user = usersRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Users friendUser = usersRepository.findById(friendUserId).orElseThrow(() -> new RuntimeException("Friend not found"));

        if (friendsRepository.findByUserAndFriendUser(user, friendUser) == null) {
            Friends friends = new Friends();
            friends.setUser(user);
            friends.setFriendUser(friendUser);
            friends.setCreatedDate(new Date());
            friendsRepository.save(friends);
        }
    }

    public void unfollowUser(String userId, String friendUserId) {
        Users user = usersRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Users friendUser = usersRepository.findById(friendUserId).orElseThrow(() -> new RuntimeException("Friend not found"));

        Friends friends = friendsRepository.findByUserAndFriendUser(user, friendUser);
        if (friends != null) {
            friendsRepository.delete(friends);
        }
    }
}

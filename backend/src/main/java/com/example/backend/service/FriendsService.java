package com.example.backend.service;

import com.example.backend.dto.FriendsRequest;
import com.example.backend.dto.Friends;
import com.example.backend.dto.Users;
import com.example.backend.repository.FriendsRequestRepository;
import com.example.backend.repository.FriendsRepository;
import com.example.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class FriendsService {
    private final FriendsRequestRepository friendsRequestRepository;
    private final FriendsRepository friendsRepository;
    private final UsersRepository usersRepository;

    public FriendsService(FriendsRequestRepository friendsRequestRepository, FriendsRepository friendsRepository, UsersRepository usersRepository) {
        this.friendsRequestRepository = friendsRequestRepository;
        this.friendsRepository = friendsRepository;
        this.usersRepository = usersRepository;
    }

    public void sendFriendRequest(String requesterId, String receiverId) {
        Users requester = usersRepository.findById(requesterId).orElseThrow();
        Users receiver = usersRepository.findById(receiverId).orElseThrow();

        FriendsRequest request = new FriendsRequest();
        request.setRequester(requester);
        request.setReceiver(receiver);
        request.setCreatedDate(new Date());
        request.setStatus("PENDING");

        friendsRequestRepository.save(request);
    }

    public List<FriendsRequest> getPendingRequests(String userId) {
        Users user = usersRepository.findById(userId).orElseThrow();
        return friendsRequestRepository.findByReceiverAndStatus(user, "PENDING");
    }

    public void acceptFriendRequest(Long requestId) {
        FriendsRequest request = friendsRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("ACCEPTED");
        friendsRequestRepository.save(request);

        Friends friends = new Friends();
        friends.setUser(request.getRequester());
        friends.setFriendUser(request.getReceiver());
        friends.setCreatedDate(new Date());
        friendsRepository.save(friends);
    }

    public void rejectFriendRequest(Long requestId) {
        FriendsRequest request = friendsRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("REJECTED");
        friendsRequestRepository.delete(request);
    }
}

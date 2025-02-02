package com.example.backend.repository;

import com.example.backend.dto.FriendsRequest;
import com.example.backend.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FriendsRequestRepository extends JpaRepository<FriendsRequest, Long> {
    List<FriendsRequest> findByReceiverAndStatus(Users receiver, String status);
}

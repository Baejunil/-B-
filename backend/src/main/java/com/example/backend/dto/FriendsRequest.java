package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
public class FriendsRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    private Users requester;  // 요청을 보낸 사람

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Users receiver;  // 요청을 받는 사람

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(nullable = false)
    private String status;  // "PENDING", "ACCEPTED", "REJECTED"
}

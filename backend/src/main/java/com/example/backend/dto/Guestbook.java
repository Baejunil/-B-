package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Guestbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestbookId;

    @Column(nullable = true) // guest_id를 포함하지 않는다면 true로 설정
    private String userId; // 작성자 ID

    @Column(nullable = true) // guest_id를 포함하지 않는다면 true로 설정
    private String guestId; // 방명록 대상 ID

    @Lob
    @Column(nullable = false) // 메시지는 필수로 작성
    private String message; // 방명록 메시지

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdDate; // 작성 날짜
}

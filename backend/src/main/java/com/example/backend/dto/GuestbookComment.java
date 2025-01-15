package com.example.backend.dto;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class GuestbookComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestbookCommentId;

    @ManyToOne
    @JoinColumn(name = "guestbookId")
    private Guestbook guestbook;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    private String comment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
}

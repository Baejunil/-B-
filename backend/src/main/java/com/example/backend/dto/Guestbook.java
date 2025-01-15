package com.example.backend.dto;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
public class Guestbook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestbookId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    @Lob
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "guestId")
    private Users guest;
}

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
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "friendUserId")
    private Users friendUser;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
}

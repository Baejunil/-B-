package com.example.backend.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.UserRepository;

@Service // 이 클래스는 서비스 계층을 담당하는 Spring 컴포넌트로 지정
public class UserService {

    @Autowired
    private UserRepository userRepository;  // UserRepository를 주입 받아 DB와 상호작용

  
}
package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(value -> value.getPassword().equals(password)).orElse(false);
    }
}

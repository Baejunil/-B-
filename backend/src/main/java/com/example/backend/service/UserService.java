package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.PasswordResetRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUser(UserDto userDto) {
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setUsername(userDto.getUsername());
        userRepository.save(user);
    }

    public Optional<String> findUserIdByEmail(String email) {
        return userRepository.findByEmail(email).map(User::getUserId);
    }

    public boolean resetPassword(String userId, String email, String newPassword) {
        Optional<User> user = userRepository.findByUserIdAndEmail(userId, email);
        if (user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setPassword(newPassword);
            userRepository.save(updatedUser);
            return true;
        }
        return false;
    }
}


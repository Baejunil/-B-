package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.Users;
import com.example.backend.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private AppUserRepository userRepository;

    public void registerUser(UserDto userDto) {
        Users user = new Users(userDto.getUserId(), userDto.getEmail(), userDto.getPassword(),
                               userDto.getName(), userDto.getBirthDate(), userDto.getGender());
        userRepository.save(user);
    }
}

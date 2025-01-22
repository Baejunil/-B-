package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.security.JwtProvider;

@Configuration
public class AppConfig {

    @Bean
    public JwtProvider jwtProvider() {
        return new JwtProvider();
    }
}

package com.example.backend.config;

import com.example.backend.security.JwtAuthenticationFilter;
import com.example.backend.security.JwtProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder; // 추가
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtProvider jwtProvider;

    public SecurityConfig(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    // [추가] PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder를 기본 예시로 사용
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // JwtAuthenticationFilter 생성
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(jwtProvider);

        http
            .csrf(csrf -> csrf.disable()) // CSRF 비활성
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                // "/api/auth/**" 등은 누구나 접근 가능
                .requestMatchers("/api/auth/**").permitAll()
                // "/api/minihome/**" 등은 인증 필요
                .requestMatchers("/api/minihome/**").authenticated()
                // 나머지 경로에 대해서도 인증 요구할지 설정
                .anyRequest().permitAll()
            )
            // UsernamePasswordAuthenticationFilter 앞에 우리가 만든 Jwt 필터 등록
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

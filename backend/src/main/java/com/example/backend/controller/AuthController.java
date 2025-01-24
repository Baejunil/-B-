package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.Users;
import com.example.backend.security.JwtProvider;
import com.example.backend.service.UsersService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UsersService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
    	System.out.println("signupRequest----------------"+signupRequest.getJoinDate());
    	
        try {
            userService.registerUser(signupRequest); // SignupRequest 전달
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    	
    	
        try {
        	System.out.println("--------오류화인-----------------------");
            String token = userService.loginAndGenerateToken(loginRequest);
            System.out.println("--------오류화인-----------------------");
            return ResponseEntity.ok(Map.of("message", "로그인 성공", "token", token));
        } catch (Exception e) {
        	
        	System.out.println("catch 문------------------------------");
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            // Bearer 제거
            String jwt = token.replace("Bearer ", "");

            // validateToken() → Jws<Claims> 반환
            Jws<Claims> claimsJws = jwtProvider.validateToken(jwt);

            // 실제 Claims 객체를 꺼내어 getSubject() 호출
            String userId = claimsJws.getBody().getSubject();
            
            // userId로 DB 조회
            Users user = userService.getUserById(userId);

            return ResponseEntity.ok(Map.of("status", "success", "data", user));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

}

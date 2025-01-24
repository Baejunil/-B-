package com.example.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {

    // 실제 운영 환경에서는 훨씬 복잡하고 안전한 키를 사용하세요!
    private static final String SECRET_KEY = Base64.getEncoder()
            .encodeToString("your-secure-secret-key-with-at-least-256-bits".getBytes());

    // 토큰 유효 시간: 1시간
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    // 토큰 발급
    public String generateToken(String userId) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(userId)                // JWT의 sub에 userId 저장
                .setIssuedAt(now)                  // 발급 시간
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME)) // 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 유효성 검사 및 Claims 반환
    public Jws<Claims> validateToken(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
        // 서명 검증, 만료 체크 등 실패 시 예외 발생
    }

    // Claims에서 userId 얻기
    public String getUserIdFromToken(String token) {
        return validateToken(token).getBody().getSubject();
    }

    // 서명에 사용할 Key 생성
    private Key getSigningKey() {
        byte[] secretKeyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(secretKeyBytes);
    }
}

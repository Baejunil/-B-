package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

public class JwtProvider {

    private static final String SECRET_KEY = Base64.getEncoder().encodeToString("your-secure-secret-key-with-at-least-256-bits".getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간

    public String generateToken(String userId) {
        Key key = getSigningKey();
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token) {
        Key key = getSigningKey();
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] secretKeyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(secretKeyBytes);
    }


	
}
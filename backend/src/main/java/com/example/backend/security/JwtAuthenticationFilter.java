package com.example.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            // 1) 헤더에서 토큰 추출
            String jwt = resolveToken(request);
            if (jwt != null) {
                // 2) 토큰 검증
                String userId = jwtProvider.getUserIdFromToken(jwt); // sub 값(예: "qw12")

                // 3) 인증 정보 생성
                //    - 실제론 UserDetailsService로 DB에서 사용자 조회 후
                //      UserDetails 객체를 만들 수도 있습니다.
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, null);

                // 요청 정보를 설정(주로 WebAuthenticationDetailsSource 이용)
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 4) SecurityContext에 인증 정보 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // 토큰 불량, 만료 등
            // 여기서 따로 로그를 찍거나, SecurityContextHolder를 clear할 수 있습니다.
            System.out.println("[JwtAuthenticationFilter] 인증 실패: " + e.getMessage());
            SecurityContextHolder.clearContext();
        }

        // 다음 필터로 진행
        filterChain.doFilter(request, response);
    }

    // Authorization 헤더에서 "Bearer " 제거 후 토큰만 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 길이 = 7
        }
        return null;
    }
}

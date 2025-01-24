package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; // 추가
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * CORS 설정
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 설정 적용
                .allowedOrigins("http://localhost:3000") // 허용할 Origin (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 쿠키 허용
    }

    /**
     * 정적 리소스 핸들러 설정
     * - "/uploads/**" 로 시작하는 요청 → 실제 로컬 "uploads/" 폴더로 매핑
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 운영 환경에서는 실제 경로 설정 필요
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
        // "file:uploads/" => 현재 프로젝트 루트 디렉토리에 있는 "uploads" 폴더
    }
}

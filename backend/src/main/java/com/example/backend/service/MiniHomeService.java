package com.example.backend.service;

import com.example.backend.dto.MiniHome;
import com.example.backend.repository.MiniHomeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MiniHomeService {

    private static final Logger logger = LoggerFactory.getLogger(MiniHomeService.class);
    private final MiniHomeRepository miniHomeRepository;

    // 파일을 저장할 디렉토리 경로 (예: 프로젝트 루트에 "uploads" 폴더)
    private final String uploadDir = "uploads/";

    /**
     * userId로 MiniHome 조회
     */
    @Transactional(readOnly = true)
    public MiniHome findByUserId(String userId) {
        return miniHomeRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저의 MiniHome이 존재하지 않습니다. userId: " + userId));
    }

    /**
     * 새로운 MiniHome 생성/저장
     */
    @Transactional
    public MiniHome createMiniHome(MiniHome miniHome) {
        if (miniHome.getUserId() == null || miniHome.getUserId().isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 userId입니다.");
        }

        if (miniHomeRepository.findByUserId(miniHome.getUserId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 MiniHome입니다. userId: " + miniHome.getUserId());
        }

        return miniHomeRepository.save(miniHome);
    }

    /**
     * MiniHome 업데이트
     */
    @Transactional
    public MiniHome updateMiniHome(MiniHome miniHome) {
        if (miniHome.getUserId() == null || miniHome.getUserId().isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 userId입니다.");
        }

        MiniHome existing = miniHomeRepository.findByUserId(miniHome.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 MiniHome입니다. userId: " + miniHome.getUserId()));

        existing.setBackground(miniHome.getBackground());
        existing.setDescription(miniHome.getDescription());

        return miniHomeRepository.save(existing);
    }

    /**
     * [수정] 실제 파일 저장 로직
     *
     * @param file 업로드할 MultipartFile
     * @return 저장된 파일의 전체 URL (ex: http://localhost:8080/uploads/...)
     */
    @Transactional
    public String uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("업로드할 파일이 없습니다.");
        }

        try {
            // 고유 파일명 생성
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path targetLocation = Paths.get(uploadDir).resolve(fileName);

            // 디렉토리가 없으면 생성
            Files.createDirectories(Paths.get(uploadDir));

            // 파일 복사(이미 동일 이름의 파일이 있으면 덮어씀)
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // 절대 경로 예: "http://localhost:8080/uploads/파일명"
            // 운영 환경에서는 "https://도메인/uploads/파일명"으로 변경 필요
            return "http://localhost:8080/uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 프로필 사진 (background) 업데이트
     *
     * @param userId        : 업데이트할 유저 ID
     * @param backgroundUrl : 새 프로필 사진 URL
     */
    @Transactional
    public void updateBackground(String userId, String backgroundUrl) {
        logger.info("프로필 사진 업데이트 요청 - userId: {}, backgroundUrl: {}", userId, backgroundUrl);

        // 현재 로그인한 유저와 요청 userId가 일치하는지 검사 (권한 체크)
        String currentUserId = getCurrentUserId();
        if (!currentUserId.equals(userId)) {
            logger.error("권한이 없습니다. 요청 userId: {}, 로그인 userId: {}", userId, currentUserId);
            throw new SecurityException("현재 로그인한 사용자는 해당 미니홈을 업데이트할 권한이 없습니다.");
        }

        MiniHome miniHome = miniHomeRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 미니홈을 찾을 수 없습니다. userId: " + userId));

        // DB에 배경 이미지(URL) 업데이트
        miniHome.setBackground(backgroundUrl);
        miniHomeRepository.save(miniHome);

        logger.info("프로필 사진이 성공적으로 업데이트되었습니다. userId: {}", userId);
    }

    /**
     * 현재 로그인한 사용자의 ID 반환
     */
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // JWT 등 Security 설정에 따라 달라질 수 있음
    }

    /**
     * MiniHome 삭제
     */
    @Transactional
    public void deleteMiniHome(Long miniHomeId) {
        if (!miniHomeRepository.existsById(miniHomeId)) {
            throw new IllegalArgumentException("존재하지 않는 MiniHome입니다. miniHomeId: " + miniHomeId);
        }
        miniHomeRepository.deleteById(miniHomeId);
    }
}

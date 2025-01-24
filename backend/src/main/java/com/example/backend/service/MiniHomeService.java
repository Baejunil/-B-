package com.example.backend.service;

import com.example.backend.dto.MiniHome;
import com.example.backend.repository.MiniHomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MiniHomeService {

    private final MiniHomeRepository miniHomeRepository;

    /**
     * userId로 MiniHome 조회
     *
     * @param userId : 유저 PK (문자열)
     * @return MiniHome 엔티티
     * @throws IllegalArgumentException : 존재하지 않는 경우
     */
    @Transactional(readOnly = true)
    public MiniHome findByUserId(String userId) {
        return Optional.ofNullable(miniHomeRepository.findByUserId(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 유저의 MiniHome이 존재하지 않습니다. userId: " + userId));
    }

    /**
     * 새로운 MiniHome 생성/저장
     *
     * @param miniHome : 저장할 MiniHome 엔티티
     * @return 저장된 MiniHome 엔티티
     */
    @Transactional
    public MiniHome createMiniHome(MiniHome miniHome) {
        if (miniHome.getUserId() == null || miniHome.getUserId().isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 userId입니다.");
        }

        // 이미 존재하면 생성할 수 없도록 처리
        if (miniHomeRepository.findByUserId(miniHome.getUserId()) != null) {
            throw new IllegalArgumentException("이미 존재하는 MiniHome입니다. userId: " + miniHome.getUserId());
        }

        return miniHomeRepository.save(miniHome);
    }

    /**
     * MiniHome 업데이트
     *
     * @param miniHome : 업데이트할 MiniHome 엔티티
     * @return 업데이트된 MiniHome 엔티티
     * @throws IllegalArgumentException : 존재하지 않는 경우
     */
    @Transactional
    public MiniHome updateMiniHome(MiniHome miniHome) {
        if (miniHome.getUserId() == null || miniHome.getUserId().isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 userId입니다.");
        }

        MiniHome existing = miniHomeRepository.findByUserId(miniHome.getUserId());
        if (existing == null) {
            throw new IllegalArgumentException("존재하지 않는 MiniHome입니다. userId: " + miniHome.getUserId());
        }

        existing.setBackground(miniHome.getBackground());
        existing.setDescription(miniHome.getDescription());

        return miniHomeRepository.save(existing);
    }

    /**
     * MiniHome 삭제
     *
     * @param miniHomeId : 삭제할 MiniHome ID
     * @throws IllegalArgumentException : 존재하지 않는 경우
     */
    @Transactional
    public void deleteMiniHome(Long miniHomeId) {
        if (miniHomeId == null) {
            throw new IllegalArgumentException("유효하지 않은 miniHomeId입니다.");
        }

        if (!miniHomeRepository.existsById(miniHomeId)) {
            throw new IllegalArgumentException("존재하지 않는 MiniHome입니다. miniHomeId: " + miniHomeId);
        }

        miniHomeRepository.deleteById(miniHomeId);
    }
}
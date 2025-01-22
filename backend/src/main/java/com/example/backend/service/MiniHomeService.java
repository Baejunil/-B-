package com.example.backend.service;

import com.example.backend.dto.MiniHome;
import com.example.backend.repository.MiniHomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MiniHomeService {

    private final MiniHomeRepository miniHomeRepository;

    /**
     * userId로 MiniHome 조회
     *
     * @param userId : 유저 PK (문자열)
     * @return MiniHome 엔티티 또는 null
     */
    public MiniHome findByUserId(String userId) {
        return miniHomeRepository.findByUserId(userId);
    }

    /**
     * 새로운 MiniHome 생성/저장
     */
    public MiniHome createMiniHome(MiniHome miniHome) {
        return miniHomeRepository.save(miniHome);
    }

    /**
     * MiniHome 업데이트
     */
    public MiniHome updateMiniHome(MiniHome miniHome) {
        MiniHome existing = miniHomeRepository.findByUserId(miniHome.getUserId());
        if (existing == null) {
            throw new IllegalArgumentException("존재하지 않는 MiniHome입니다.");
        }
        existing.setBackground(miniHome.getBackground());
        existing.setDescription(miniHome.getDescription());
        return miniHomeRepository.save(existing);
    }

    /**
     * MiniHome 삭제
     */
    public void deleteMiniHome(Long miniHomeId) {
        miniHomeRepository.deleteById(miniHomeId);
    }
}


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
     * @param userId : 유저 PK (문자열)
     * @return MiniHome 엔티티 또는 null
     */
    public MiniHome findByUserId(String userId) {
        // String userId에 맞춰, repository 메서드도 맞게 수정
        return miniHomeRepository.findByUserId(userId);
    }

    /**
     * 새로운 MiniHome 생성/저장 예시
     */
    public MiniHome createMiniHome(MiniHome miniHome) {
        return miniHomeRepository.save(miniHome);
    }

    /**
     * 업데이트/수정 예시
     */
    public MiniHome updateMiniHome(MiniHome miniHome) {
        // 필요하면, 기존 엔티티 존재 여부 확인 후 업데이트
        return miniHomeRepository.save(miniHome);
    }

    /**
     * 삭제 예시
     */
    public void deleteMiniHome(Long miniHomeId) {
        miniHomeRepository.deleteById(miniHomeId);
    }
}

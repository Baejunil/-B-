package com.example.backend.controller;

import com.example.backend.dto.MiniHome;
import com.example.backend.service.MiniHomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/minihome")
@RequiredArgsConstructor
public class MiniHomeController {

    private final MiniHomeService miniHomeService;

    /**
     * 특정 userId를 가진 사용자의 미니홈 정보 조회
     * @param userId : 조회할 유저 ID
     * @return MiniHome 정보가 있으면 200 OK, 없으면 404 NOT FOUND
     */
    @GetMapping("/{userId}")
    public ResponseEntity<MiniHome> getMiniHomeByUser(@PathVariable String userId) {
        MiniHome miniHome = miniHomeService.findByUserId(userId);
        if (miniHome == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(miniHome); 
        // miniHome -> JSON 변환 시, user 필드(Users)도 함께 직렬화
    }
}

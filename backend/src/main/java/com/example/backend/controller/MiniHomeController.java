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
     *
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
    }

    /**
     * MiniHome 생성
     */
    @PostMapping
    public ResponseEntity<MiniHome> createMiniHome(@RequestBody MiniHome miniHome) {
        MiniHome createdMiniHome = miniHomeService.createMiniHome(miniHome);
        return ResponseEntity.status(201).body(createdMiniHome);
    }

    /**
     * MiniHome 수정
     */
    @PutMapping("/{userId}")
    public ResponseEntity<MiniHome> updateMiniHome(@PathVariable String userId, @RequestBody MiniHome miniHome) {
        miniHome.setUserId(userId); // PathVariable로 받은 userId 설정
        MiniHome updatedMiniHome = miniHomeService.updateMiniHome(miniHome);
        return ResponseEntity.ok(updatedMiniHome);
    }
}

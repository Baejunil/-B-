package com.example.backend.controller;

import com.example.backend.dto.MiniHome;
import com.example.backend.service.MiniHomeService;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/minihome")
@RequiredArgsConstructor
public class MiniHomeController {

    private final MiniHomeService miniHomeService;

    /**
     * 특정 userId를 가진 사용자의 미니홈 정보 조회
     */
    @GetMapping("/{userId}")
    public ResponseEntity<MiniHome> getMiniHomeByUser(@PathVariable String userId) {
        MiniHome miniHome = miniHomeService.findByUserId(userId);
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

    /**
     * 프로필 사진 (background) 업데이트
     * 
     * - 클라이언트에서는 Multipart 형식으로 파일을 전송
     * - 파일 업로드 후 반환된 URL을 backgroundUrl로 설정
     */
    @PutMapping("/{userId}/background")
    public ResponseEntity<Map<String, String>> updateBackground(
            @PathVariable String userId,
            @RequestParam("file") MultipartFile file
    ) {
        String fileUrl = miniHomeService.uploadFile(file);
        miniHomeService.updateBackground(userId, fileUrl);

        // JSON 형태로 fileUrl을 반환
        Map<String, String> response = new HashMap<>();
        response.put("fileUrl", fileUrl);

        return ResponseEntity.ok(response);
    }


    /**
     * MiniHome 삭제
     */
    @DeleteMapping("/{miniHomeId}")
    public ResponseEntity<String> deleteMiniHome(@PathVariable Long miniHomeId) {
        miniHomeService.deleteMiniHome(miniHomeId);
        return ResponseEntity.ok("MiniHome이 삭제되었습니다.");
    }
}

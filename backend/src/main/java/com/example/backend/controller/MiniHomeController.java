// MiniHomeController: 미니홈피 정보 조회 및 수정 API
package com.example.backend.controller;

import com.example.backend.dto.MiniHome;
import com.example.backend.repository.MiniHomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/minihome")
public class MiniHomeController {

    @Autowired
    private MiniHomeRepository miniHomeRepository;

    // 미니홈피 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<MiniHome> getMiniHomeById(@PathVariable Long id) {
        Optional<MiniHome> miniHome = miniHomeRepository.findById(id);
        return miniHome.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 미니홈피 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<MiniHome> updateMiniHome(@PathVariable Long id, @RequestBody MiniHome updatedMiniHome) {
        Optional<MiniHome> miniHomeOptional = miniHomeRepository.findById(id);
        if (miniHomeOptional.isPresent()) {
            MiniHome miniHome = miniHomeOptional.get();
            miniHome.setBackground(updatedMiniHome.getBackground());
            miniHome.setDescription(updatedMiniHome.getDescription());
            MiniHome savedMiniHome = miniHomeRepository.save(miniHome);
            return ResponseEntity.ok(savedMiniHome);
        }
        return ResponseEntity.notFound().build();
    }
}
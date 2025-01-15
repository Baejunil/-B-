// SongsController: BGM 조회 및 재생 API
package com.example.backend.controller;

import com.example.backend.dto.Songs;
import com.example.backend.repository.SongsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongsController {

    @Autowired
    private SongsRepository songsRepository;

    // BGM 목록 조회
    @GetMapping
    public ResponseEntity<List<Songs>> getAllSongs() {
        List<Songs> songs = songsRepository.findAll();
        return ResponseEntity.ok(songs);
    }

    // BGM 재생 횟수 증가
    @PutMapping("/{id}/play")
    public ResponseEntity<Songs> increasePlayCount(@PathVariable Long id) {
        Optional<Songs> songOptional = songsRepository.findById(id);
        if (songOptional.isPresent()) {
            Songs song = songOptional.get();
            song.setPlayCount(song.getPlayCount() + 1);
            Songs savedSong = songsRepository.save(song);
            return ResponseEntity.ok(savedSong);
        }
        return ResponseEntity.notFound().build();
    }
}

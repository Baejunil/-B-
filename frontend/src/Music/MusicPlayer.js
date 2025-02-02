import React, { useState, useRef } from "react";

const MusicPlayer = ({ songs }) => {
    const [currentSong, setCurrentSong] = useState(null); // 현재 재생 중인 노래
    const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
    const audioRef = useRef(null); // 오디오 엘리먼트 참조

    // 노래 선택 및 재생 핸들러
    const handlePlaySong = (song) => {
        if (currentSong && currentSong.url === song.url) {
            // 같은 노래를 클릭한 경우: 재생/일시정지 토글
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            // 다른 노래를 클릭한 경우: 새로운 노래로 교체
            if (audioRef.current) {
                audioRef.current.pause(); // 이전 노래 멈춤
            }
            setCurrentSong(song); // 현재 노래 업데이트
            setIsPlaying(true);
            setTimeout(() => audioRef.current.play(), 0); // 새로운 노래 재생
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>asd
            <h2>음악 리스트</h2>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>가수</th>
                        <th>재생</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song.id}>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>
                                <button onClick={() => handlePlaySong(song)}>
                                    {currentSong && currentSong.url === song.url && isPlaying ? "⏸️ 일시정지" : "▶️ 재생"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 현재 재생 중인 오디오 바 */}
            {currentSong && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h3>현재 재생 중: {currentSong.title} - {currentSong.artist}</h3>
                    <audio
                        ref={audioRef}
                        src={currentSong.url}
                        onEnded={() => setIsPlaying(false)} // 노래가 끝났을 때 상태 업데이트
                        controls
                        style={{ width: "100%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;

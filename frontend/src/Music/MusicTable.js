import React, { useState, useRef, useEffect } from "react";
import "./MusicTable.css";

const MusicTable = ({ songs = [] }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlaySong = (song) => {
        if (currentSong?.id === song.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const handleAudioEnded = () => {
        const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
        const nextSong = songs[(currentIndex + 1) % songs.length];
        setCurrentSong(nextSong);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    return (
        <div className="music-table">
            <h2>음악 리스트</h2>
            {songs.length === 0 ? (
                <p>음악 리스트가 비어 있습니다. 음악을 추가해주세요!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>노래 제목</th>
                            <th>아티스트</th>
                            <th>재생</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={song.id}>
                                <td>{index + 1}</td>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <button
                                        onClick={() => handlePlaySong(song)}
                                        className={currentSong?.id === song.id && isPlaying ? "playing" : ""}
                                    >
                                        {currentSong?.id === song.id && isPlaying ? "⏸️ 중지" : "▶️ 재생"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="audio-bar">
                <h3>
                    {currentSong
                        ? `현재 재생 중: ${currentSong.title} - ${currentSong.artist}`
                        : "재생할 곡을 선택하세요."}
                </h3>
                <audio
                    ref={audioRef}
                    src={currentSong?.url || ""}
                    controls
                    autoPlay={isPlaying}
                    onEnded={handleAudioEnded}
                />
            </div>
        </div>
    );
};

export default MusicTable;

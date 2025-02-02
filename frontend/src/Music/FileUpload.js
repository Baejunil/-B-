import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios";

const MusicUpload = ({ onUploadSuccess }) => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!title || !artist || !file) {
            alert("모든 필드를 입력하세요!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("artist", artist);

        try {
            const response = await axios.post("http://localhost:8080/api/songs/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("업로드 성공:", response.data);

            if (onUploadSuccess) {
                onUploadSuccess(response.data);
            }

            // 🎯 업로드 성공 후 1초 후 음악 리스트 페이지로 이동
            setTimeout(() => {
                navigate("/music-table");
            }, 1000);

        } catch (error) {
            if (error.response) {
                console.error("업로드 실패: 서버 응답 에러", error.response.status, error.response.data);
                alert(`업로드 실패: ${error.response.data.message || "서버 에러 발생"}`);
            } else if (error.request) {
                console.error("업로드 실패: 서버 응답 없음", error.request);
                alert("업로드 실패: 서버와 연결할 수 없습니다.");
            } else {
                console.error("업로드 실패: 요청 설정 에러", error.message);
                alert(`업로드 실패: ${error.message}`);
            }
        }
    };

    return (
        <div className="upload-container">
            <h2>음악 업로드</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>노래 제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="노래 제목을 입력하세요"
                    />
                </div>
                <div>
                    <label>아티스트:</label>
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="아티스트 이름을 입력하세요"
                    />
                </div>
                <div>
                    <label>파일:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">업로드</button>
            </form>
        </div>
    );
};

export default MusicUpload;

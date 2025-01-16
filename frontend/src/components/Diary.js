import React, { useState } from "react";
import axios from "axios";
import "./Diary.css";

function Diary() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddDiary = async () => {
    if (title.trim() && content.trim()) {
      try {
        setLoading(true); // 로딩 시작
        setError(""); // 에러 메시지 초기화

        // API 요청
        const response = await axios.post("http://localhost:8080/api/diary", {
          title,
          content,
        });

        // 요청 성공 시 다이어리 항목 추가
        setDiaryEntries([...diaryEntries, response.data]);

        // 입력값 초기화
        setTitle("");
        setContent("");
      } catch (err) {
        // 에러 처리
        setError("다이어리 항목을 추가하는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 끝
      }
    }
  };

  return (
    <div className="diary-container">
      <h2>다이어리</h2>
      <div className="diary-form">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddDiary} disabled={loading}>
          {loading ? "작성 중..." : "작성"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="diary-entries">
        {diaryEntries.map((entry, index) => (
          <div key={index} className="diary-entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diary;

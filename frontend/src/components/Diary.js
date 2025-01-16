import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance"; // 공통 Axios 인스턴스 사용
import "./Diary.css";

function Diary() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 초기 다이어리 항목 불러오기
    const fetchDiaries = async () => {
      try {
        const response = await axios.get("/diary");
        setDiaryEntries(response.data);
      } catch (err) {
        setError("다이어리를 불러오는 데 실패했습니다.");
      }
    };

    fetchDiaries();
  }, []);

  const handleAddDiary = async () => {
    if (title.trim() && content.trim()) {
      try {
        setLoading(true);
        setError("");

        const response = await axios.post("/diary", { title, content });
        setDiaryEntries((prev) => [...prev, response.data]);
        setTitle("");
        setContent("");
      } catch (err) {
        setError(err.response?.data?.message || "다이어리를 추가하는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("제목과 내용을 입력하세요.");
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
          <div key={entry.diaryId || index} className="diary-entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diary;

import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import "./Diary.css";

function Diary() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get("/diary");
        setDiaryEntries(response.data);
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const handleDelete = async (diaryId) => {
    try {
      await axios.delete(`/diary/${diaryId}`);
      setDiaryEntries((prev) => prev.filter((entry) => entry.diaryId !== diaryId));
      setSelectedEntry(null);
    } catch (error) {
      console.error("Failed to delete diary:", error);
    }
  };

  const handleCreateDiary = async () => {
    if (!newEntry.title || !newEntry.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/diary", newEntry);
      setDiaryEntries((prev) => [...prev, response.data]);
      setIsWriting(false);
      setNewEntry({ title: "", content: "" });
    } catch (error) {
      console.error("Failed to create diary:", error);
    }
  };

  return (
    <div className="diary-page">
      <div className="diary-sidebar">
        <div className="profile-section">
          <img src="/profile.png" alt="프로필 사진" className="profile-pic" />
          <div className="profile-info">
            <p>😀 이름</p>
            <p>📞 Phone</p>
            <p>📧 E-mail</p>
            <p>⭐ 인스타그램</p>
          </div>
          <div className="mood-selector">
            <label htmlFor="mood">오늘의 기분</label>
            <select id="mood">
              <option>기쁨 😍</option>
              <option>슬픔 😢</option>
              <option>화남 😡</option>
              <option>설렘 💖</option>
            </select>
          </div>
        </div>
      </div>
      <div className="diary-content">
        {isWriting ? (
          <div className="diary-write">
            <h2>다이어리 작성</h2>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            />
            <textarea
              placeholder="내용을 입력하세요"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            />
            <div className="diary-actions">
              <button onClick={handleCreateDiary} className="save-button">
                저장하기
              </button>
              <button onClick={() => setIsWriting(false)} className="cancel-button">
                취소하기
              </button>
            </div>
          </div>
        ) : !selectedEntry ? (
          <div className="diary-list">
            <div className="diary-header">
              <h2>DIARY</h2>
              <button onClick={() => setIsWriting(true)} className="write-button">
                작성하기
              </button>
            </div>
            {diaryEntries.map((entry) => (
              <div className="diary-item" key={entry.diaryId}>
                <div className="diary-info">
                  <span className="diary-date">{entry.date}</span>
                  <span className="diary-title">{entry.title}</span>
                </div>
                <button onClick={() => handleSelectEntry(entry)} className="detail-button">
                  보기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="diary-detail">
            <h2>DIARY</h2>
            <p className="diary-date">{selectedEntry.date}</p>
            <h3 className="diary-title">{selectedEntry.title}</h3>
            <p className="diary-content">{selectedEntry.content}</p>
            <div className="diary-actions">
              <button className="edit-button">수정하기</button>
              <button
                onClick={() => handleDelete(selectedEntry.diaryId)}
                className="delete-button"
              >
                삭제하기
              </button>
            </div>
            <button className="back-button" onClick={() => setSelectedEntry(null)}>
              &lt; 목록으로
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diary;

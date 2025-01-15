import React, { useState } from "react";
import "./Diary.css";

function Diary() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddDiary = () => {
    if (title.trim() && content.trim()) {
      setDiaryEntries([...diaryEntries, { title, content }]);
      setTitle("");
      setContent("");
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
        <button onClick={handleAddDiary}>작성</button>
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

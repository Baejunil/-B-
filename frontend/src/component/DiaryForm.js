import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DiaryForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();
  // 다이어리 생성 함수
  const createDiary = (newDiary) => {
    fetch('http://localhost:8080/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDiary),
    })
      .then(response => response.json())
      .then(createdDiary => setDiaries([...diaries, createdDiary]));
      navigate('/diary');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiary = {
      title,
      content,
      createdDate: new Date(),
    };
    createDiary(newDiary);
    setTitle('');
    setContent('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>다이어리 작성</h2>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

export default DiaryForm;
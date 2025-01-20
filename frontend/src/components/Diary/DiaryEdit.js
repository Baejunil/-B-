import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./DiaryPage.css";
function DiaryEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/diary/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDiary = {
      title,
      content,
      createdDate: new Date(),
    };

    fetch(`http://localhost:8080/api/diary/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDiary),
    })
      .then(response => response.json())
      .then(() => {
        // 수정 후 상세 페이지로 돌아가기
        navigate(`/diary/${id}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>다이어리 수정</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default DiaryEdit;
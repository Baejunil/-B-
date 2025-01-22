import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BoardForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  // 다이어리 생성 함수
  const createBoard = (newBoard) => {
    fetch('http://localhost:8080/api/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    })
      .then(response => response.json())
      .then(createdBoard => setBoards([...boards, createdBoard]));
      navigate('/board');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      title,
      content,
      createdDate: new Date(),
    };
    createBoard(newBoard);
    setTitle('');
    setContent('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>게시판 작성</h2>
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

export default BoardForm;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DiaryForm() {
  const [user, setUser] = useState(null);  // 초기값을 null로 설정
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  // 사용자 정보 가져오기 (useEffect 사용)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8080/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);  // 사용자 정보를 state에 저장
        })
        .catch(error => console.error('User data fetch error:', error));
    }
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

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
      .then(createdDiary => {
        setDiaries([...diaries, createdDiary]);
        navigate('/diary');  // 다이어리 페이지로 리다이렉트
      })
      .catch(error => console.error('Diary creation error:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('사용자 정보가 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    const newDiary = {
      userId: user.data.userId,  // `user` 객체에서 `id`를 가져와서 사용
      title,
      content,
      visibility,
      createdDate: new Date(),
    };

    console.log(newDiary.userId + " userId 찍어보기");
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
      <div>
        <label>공개 설정</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">전체 공개</option>
          <option value="private">비공개</option>
          <option value="friends">일촌 공개</option>
        </select>
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

export default DiaryForm;

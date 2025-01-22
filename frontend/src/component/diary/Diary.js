import React, { useState, useEffect } from 'react';
import DiaryList from './DiaryList';
import { Link } from 'react-router-dom';

function Diary() {
  const [diaries, setDiaries] = useState([]);

  // 다이어리 목록을 불러오는 함수
  useEffect(() => {
    fetch('http://localhost:8080/api/diary')
      .then(response => response.json())
      .then(data => setDiaries(data));
  }, []);


  

  return (
    <div>
      <h1>다이어리</h1>
      <DiaryList diaries={diaries} />
      <Link to="/diary/create">
        <button>작성</button>
      </Link>
    </div>
  );
}


export default Diary;
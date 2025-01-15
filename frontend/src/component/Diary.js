import React, { useState, useEffect } from 'react';
import DiaryForm from './DiaryForm.js';
import DiaryList from './DiaryList';

function Diary() {
  const [diaries, setDiaries] = useState([]);

  // 다이어리 목록을 불러오는 함수
  useEffect(() => {
    fetch('http://localhost:8080/api/diary')
      .then(response => response.json())
      .then(data => setDiaries(data));
  }, []);

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
  };

  return (
    <div>
      <h1>다이어리</h1>
      <DiaryForm createDiary={createDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
}


export default Diary;
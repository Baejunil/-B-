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


  //다이어리 삭제 함수
  const deleteDiary = (diaryId) => {
    console.log("삭제 요청")
    fetch(`http://localhost:8080/api/diary/${diaryId}`, {
      method: 'DELETE', 
    })
      .then(response => {
        if (response.ok) {
          // 삭제가 성공적으로 이루어지면, 로컬 상태에서 해당 항목을 제거
          setDiaries(diaries.filter(diary => diary.id !== diaryId));
        } else {
          // 삭제 실패 시 처리
          console.error('Failed to delete the diary');
        }
      })
      .catch(error => {
        // 네트워크 오류나 예외 처리
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>다이어리</h1>
      <DiaryList diaries={diaries} deleteDiary = {deleteDiary} />
      <Link to="/diary/create">
        <button>작성</button>
      </Link>
    </div>
  );
}


export default Diary;
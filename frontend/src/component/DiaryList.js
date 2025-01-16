import React from 'react';
import { Link } from 'react-router-dom';
function DiaryList({ diaries}) {
  

  return (
    <div>
      <h2>다이어리 목록</h2>
      {diaries.length > 0 ? (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.diaryId}>
              <h3>
              <Link to={`/diary/${diary.diaryId}`}>{diary.title}</Link>
              </h3>
              <p><strong>작성 날짜 : </strong> {new Date(diary.createdDate).toLocaleString()}</p>
            </li>
            
          ))}
          
        </ul>
      ) : (
        <p>다이어리가 존재하지 않습니다.</p>
      )}
    </div>
  );
}

export default DiaryList;

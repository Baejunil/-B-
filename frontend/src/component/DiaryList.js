import React from 'react';

function DiaryList({ diaries, deleteDiary }) {

  return (
    <div>
      <h2>다이어리 목록</h2>
      {diaries.length > 0 ? (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.diaryId}>
              <h3>{diary.title}</h3>
              <p>{diary.content}</p>
              <p><strong>작성 날짜 : </strong> {new Date(diary.createdDate).toLocaleString()}</p>
              <button onClick={() => deleteDiary(diary.diaryId)}>삭제</button>
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

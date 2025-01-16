import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DiaryDetail() {
  const [diary, setDiary] = useState(null);
  const { id } = useParams(); // 다이어리 ID 파라미터 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/diary/${id}`)
      .then(response => response.json())
      .then(data => setDiary(data));
  }, [id]);

  const deleteDiary = () => {
    fetch(`http://localhost:8080/api/diary/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // 삭제 후 다이어리 목록 페이지로 이동
          navigate('/diary');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {diary ? (
        <>
          <h2>{diary.title}</h2>
          <p>{diary.content}</p>
          <p><strong>작성 날짜: </strong>{new Date(diary.createdDate).toLocaleString()}</p>
          <button onClick={deleteDiary}>삭제</button>
          <button onClick={() => navigate(`/diary/edit/${diary.diaryId}`)}>수정</button> {/* 수정 페이지로 이동 */}
          <button onClick={() => navigate(`/diary`)}>돌아가기</button> {/* 돌아가기 */}
        </>
      ) : (
        <p>다이어리를 불러오는 중...</p>
      )}
    </div>
  );
}

export default DiaryDetail;
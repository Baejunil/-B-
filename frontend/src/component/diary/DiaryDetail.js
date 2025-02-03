import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentList from './DiaryCommentList'; // 댓글 목록 표시

function DiaryDetail() {
  const [diary, setDiary] = useState(null);
  const { id } = useParams(); // 다이어리 ID 파라미터 가져오기
  const [loggedInUserId, setLoggedInUserId] = useState(null); // 현재 로그인한 사용자 ID
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 추가
  const navigate = useNavigate();

  // 현재 로그인한 사용자 정보 가져오기
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
        .then(data => setLoggedInUserId(data))  // 사용자 정보를 상태에 저장
        .catch(error => console.error('User data fetch error:', error));
    }
  }, []); 

  // 다이어리 아이디에 해당하는 정보 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/api/diary/${id}`)
      .then(response => response.json())
      .then(data => {
        setDiary(data);
        setLoading(false); // 데이터 로딩이 끝난 후 false 설정
      })
      .catch(error => {
        console.error('Error fetching diary:', error);
        setLoading(false);
      });
  }, [id]);

  // 다이어리 삭제 기능
  const deleteDiary = () => {
    fetch(`http://localhost:8080/api/diary/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // 삭제 성공 후 0.5초 후 목록 페이지로 이동
          setTimeout(() => navigate('/diary'), 500);
        } else {
          console.error('Failed to delete diary');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // 데이터 로딩 중이면 로딩 표시
  if (loading) {
    return <p>Loading...</p>;
  }

  // 다이어리 데이터가 없으면 오류 메시지 표시
  if (!diary) {
    return <p>해당 다이어리를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h2>{diary.title}</h2>
      <p>{diary.content}</p>
      <p><strong>작성 날짜: </strong>{new Date(diary.createdDate).toLocaleString()}</p>

      {/* 로그인한 사용자와 다이어리 작성자가 같을 때만 버튼 표시 */}
      {loggedInUserId && loggedInUserId.data && loggedInUserId.data.userId && diary.userId === loggedInUserId.data.userId && (
        <>
          <button onClick={deleteDiary}>삭제</button>
          <button onClick={() => navigate(`/diary/edit/${diary.diaryId}`)}>수정</button>
        </>
      )}
      
      <button onClick={() => navigate(`/diary`)}>돌아가기</button>
      <br />

      {/* 댓글 목록 표시 */}
      <CommentList diaryId={id}  />
    </div>
  );
}

export default DiaryDetail;

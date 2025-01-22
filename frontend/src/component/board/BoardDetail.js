import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function BoardDetail() {
  const [board, setBoard] = useState(null);
  const { id } = useParams(); // 게시판 ID 파라미터 가져오기
  const navigate = useNavigate();
  
  

  useEffect(() => {
    fetch(`http://localhost:8080/api/board/${id}`)
      .then(response => response.json())
      .then(data => setBoard(data));
  }, [id]);

  const deleteBoard = () => {
    fetch(`http://localhost:8080/api/board/${id}`, {
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
      {board ? (
        <>
        
          <h2>{board.title}</h2>
          <p>{board.content}</p>
          <p><strong>작성 날짜: </strong>{new Date(board.createdDate).toLocaleString()}</p>
          <button onClick={deleteBoard}>삭제</button>
          {/* <button onClick={() => navigate(`/diary/edit/${diary.diaryId}`)}>수정</button> 수정 페이지로 이동 */}
          <button onClick={() => navigate(`/board`)}>돌아가기</button> {/* 돌아가기 */}
          <br />
          
          
        </>
      ) : (
        <p>게시판 불러오는 중...</p>
      )}
    </div>
  );
}

export default BoardDetail;
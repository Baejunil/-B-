import React, { useState, useEffect } from 'react';

function DiaryCommentForm({ diaryId, onCommentAdded }) {
  const [comment, setComment] = useState('');

  const [user, setUser] = useState(null);  // 초기값을 null로 설정

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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/diary/${diaryId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user.data.userId,
        comment: comment,
        createdDate: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onCommentAdded(data); // 댓글 추가 후 부모 컴포넌트에 알리기
        setComment('');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 작성하세요"
        required
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default DiaryCommentForm;
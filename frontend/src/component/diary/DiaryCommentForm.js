import React, { useState } from 'react';

function DiaryCommentForm({ diaryId, onCommentAdded }) {
  const [comment, setComment] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/diary/${diaryId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
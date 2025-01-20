import React, { useEffect, useState } from 'react';
import CommentForm from './DiaryCommentForm'; // 댓글 작성 폼

function DiaryCommentList({ diaryId }) {
  const [comments, setComments] = useState([]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]); // 새로운 댓글 추가
  };

 

  useEffect(() => {
    fetch(`http://localhost:8080/api/diary/${diaryId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error:', error));
  }, [diaryId]);

  return (
    <div>
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.diaryCommentId}>
            <p>{comment.comment}</p>
            <p><strong>작성 날짜:</strong> {new Date(comment.createdDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <CommentForm diaryId={diaryId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default DiaryCommentList;
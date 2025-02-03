import React, { useEffect, useState } from 'react';
import BoardCommentForm from './BoardCommentForm';

function BoardCommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]); // 새로운 댓글 추가
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/board/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error:', error));
  }, [postId]);

  const deleteComment = (commentId) => {
    fetch(`http://localhost:8080/api/board/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.boardCommentId !== commentId)
        );
      })
      .catch((error) => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.boardCommentId}>
            <p>{comment.comment}</p>
            <p><strong>작성 날짜:</strong> {new Date(comment.createdDate).toLocaleString()}</p>
            <button onClick={() => deleteComment(comment.boardCommentId)}>삭제</button>
          </li>
        ))}
      </ul>
      <BoardCommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default BoardCommentList;
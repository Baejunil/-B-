import React, { useEffect, useState } from "react";
import DiaryCommentForm from "./DiaryCommentForm";

function DiaryCommentList({ diaryId }) {
  const [comments, setComments] = useState([]); // 댓글 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]); // 새로운 댓글 추가
  };

  useEffect(() => {
    if (!diaryId) {
      console.error("Diary ID가 제공되지 않았습니다.");
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await fetch(
          `http://localhost:8080/api/diary/${diaryId}/comments`
        );
        if (!response.ok) {
          throw new Error("댓글 데이터를 불러오는 중 오류 발생");
        }
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []); // 배열 형식 확인 후 설정
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        setComments([]); // 오류 시 빈 배열로 초기화
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchComments();
  }, [diaryId]);

  return (
    <div>
      <h3>댓글</h3>
      {loading ? ( // 로딩 상태 확인
        <p>댓글을 불러오는 중...</p>
      ) : comments.length > 0 ? ( // 댓글 리스트 렌더링
        <ul>
          {comments.map((comment) => (
            <li key={comment.diaryCommentId || comment.id}>
              <p>{comment.comment}</p>
              <p>
                <strong>작성 날짜:</strong>{" "}
                {new Date(comment.createdDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>댓글이 없습니다.</p> // 댓글이 없을 때 표시
      )}
      <DiaryCommentForm diaryId={diaryId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default DiaryCommentList;

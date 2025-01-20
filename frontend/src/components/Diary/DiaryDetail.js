import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DiaryPage.css";
import DiaryCommentList from "./DiaryCommentList";

function DiaryDetail() {
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Diary ID가 제공되지 않았습니다.");
      return;
    }

    const fetchDiary = async () => {
      try {
        console.log("Diary ID:", id);
        const response = await fetch(`http://localhost:8080/api/diary/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDiary(data);
      } catch (err) {
        console.error("Diary 데이터를 불러오는 중 오류 발생:", err);
        setError("Diary 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id]);

  if (loading) return <p className="loading-message">다이어리를 불러오는 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="diary-detail-container">
      {diary && (
        <>
          <div className="diary-header">
            <h2 className="diary-title">{diary.title}</h2>
            <p className="diary-date">
              작성 날짜: {new Date(diary.createdDate).toLocaleString()}
            </p>
          </div>
          <div className="diary-content">{diary.content}</div>
          <div className="diary-buttons">
            <button
              className="button edit-button"
              onClick={() => navigate(`/diary/edit/${id}`)}
            >
              수정하기
            </button>
            <button
              className="button delete-button"
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:8080/api/diary/${id}`, {
                    method: "DELETE",
                  });
                  if (response.ok) navigate("/diary");
                } catch (err) {
                  console.error("Diary 삭제 중 오류 발생:", err);
                  setError("Diary 삭제 중 오류가 발생했습니다.");
                }
              }}
            >
              삭제하기
            </button>
            <button
              className="button back-button"
              onClick={() => navigate("/diary")}
            >
              목록으로
            </button>
          </div>
          <DiaryCommentList diaryId={id} />
        </>
      )}
    </div>
  );
}

export default DiaryDetail;

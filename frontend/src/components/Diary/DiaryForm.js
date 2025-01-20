import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryPage.css";

function DiaryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 중복 호출 방지

    setLoading(true); // 로딩 시작
    setError(null);

    const newDiary = {
      title,
      content,
      createdDate: new Date(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiary),
      });

      if (!response.ok) {
        throw new Error("다이어리 생성 중 오류 발생");
      }

      navigate("/diary");
    } catch (submitError) {
      console.error("다이어리 생성 오류:", submitError);
      setError("다이어리를 생성하는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="diary-form-container">
      <h2>다이어리 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="diary-form-buttons">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/diary")}
          >
            목록으로
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "작성 중..." : "작성"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DiaryForm;

import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryPage.css";

function DiaryForm() {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();
  
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 중복 호출 방지

    setLoading(true); // 로딩 시작
    setError(null);

    const newDiary = {
      userId: user.data.userId,
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

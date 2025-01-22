import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import axios from "axios";
import "./Login.css"; // CSS 파일을 연결

const LoginForm = () => {
  const [form, setForm] = useState({ userId: "", password: "" });
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", form);

      // 서버가 반환한 응답 확인
      if (response.data && response.data.message) {
        alert(response.data.message); // 성공 메시지 표시
        navigate("/home"); // 로그인 성공 시 홈으로 이동
      } else {
        alert("서버 응답 형식이 올바르지 않습니다.");
      }
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // 에러 메시지 표시
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>로그인</h1>
      </header>
      <div className="login-container">
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input
                id="userId"
                type="text"
                name="userId"
                placeholder="아이디"
                value={form.userId}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">로그인</button>
          </form>
          <div className="link-buttons">
            <button onClick={() => navigate("/signup")} className="link-btn">
              회원가입
            </button>
            <button onClick={() => navigate("/find-id")} className="link-btn">
              아이디 찾기
            </button>
            <button onClick={() => navigate("/find-password")} className="link-btn">
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <p>로그인 문제가 있으신가요? <span className="link-btn">문의하기</span>
        🌟 행복한 하루 되세요! 🌟</p>
        

      </footer>
    </div>
  );
};

export default LoginForm;

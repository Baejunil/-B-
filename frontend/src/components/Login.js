// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 로그인 버튼(또는 폼) 제출 시 호출되는 함수
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        alert("로그인 성공!");
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        alert(data.message || "로그인 실패");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 요청 중 문제가 발생했습니다.");
    }
  };
  

  return (
    <div className="login-page">
      {/* 상단 헤더 영역 */}
      <div className="login-header">
        <h1>Welcome Back!</h1>
      </div>

      {/* 중앙 로그인 카드 */}
      <div className="login-container">
        <div className="login-card">
          <h2>로그인</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">로그인</button>
          </form>
          <p>
            계정이 없으신가요?{" "}
            <span className="link-btn" onClick={() => navigate("/signup")}>
              회원가입
            </span>
          </p>
        </div>
      </div>

      {/* 하단 푸터 영역 */}
      <div className="login-footer">
        <p>🌟 행복한 하루 되세요! 🌟</p>
      </div>
    </div>
  );
}

export default Login;

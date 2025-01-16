import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "1" && password === "1") {
      alert("로그인 성공!");
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="button" onClick={handleLogin}>
              로그인
            </button>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 임시 로그인 검증 로직: "1", "1"로 로그인 가능하게 설정
    if (email === "1" && password === "1") {
      alert("로그인 성공!");
      setIsLoggedIn(true); // 로그인 상태 변경
      navigate("/miniroom"); // 미니룸 페이지로 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="login-container">
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
        <button className="link-btn" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </p>
    </div>
  );
}

export default Login;

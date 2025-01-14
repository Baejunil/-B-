import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 처리 로직 (추후 API 연동 가능)
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/"); // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
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

        <div className="input-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </form>
      <p>
        이미 계정이 있으신가요?{" "}
        <button className="link-btn" onClick={() => navigate("/")}>
          로그인
        </button>
      </p>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    const { userId, email, password } = formData;

    if (!userId || !email || !password) {
      setStatus("모든 필드를 입력해주세요.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setStatus("회원가입 성공!");
  };

  return (
    <div className="signup-page">
      {/* 상단 헤더 */}
      <div className="signup-header">
        <h1>회원가입</h1>
      </div>

      {/* 중앙 회원가입 카드 */}
      <div className="signup-container">
        <div className="signup-card">
          <h2>회원가입</h2>
          <div className="input-group">
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button onClick={handleSignup}>회원가입</button>
          {status && <p className="status-message">{status}</p>}
        </div>
      </div>

      {/* 하단 푸터 */}
      <div className="signup-footer">
        <p>🌟 새로운 여정을 시작하세요! 🌟</p>
      </div>
    </div>
  );
}

export default Signup;

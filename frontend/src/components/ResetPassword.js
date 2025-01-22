// FindPasswordForm.js
import React, { useState } from "react";
import axios from "axios";
import "./FindForm.css";

const FindPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/find-password", { email });
      alert("비밀번호 초기화 이메일이 전송되었습니다.");
    } catch (error) {
      alert("비밀번호 찾기 실패: " + error.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className="find-form-container">
      <h2 className="find-form-title">비밀번호 찾기</h2>
      <form className="find-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="find-form-button">
          비밀번호 찾기
        </button>
      </form>
    </div>
  );
};

export default FindPasswordForm;
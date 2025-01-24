// FindIdForm.js
import React, { useState } from "react";
import axios from "axios";
import "./FindForm.css";

const FindId = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/find-id", { email });
      alert("아이디: " + response.data.userId);
    } catch (error) {
      alert("아이디 찾기 실패: " + error.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className="find-form-container">
      <h2 className="find-form-title">아이디 찾기</h2>
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
          아이디 찾기
        </button>
      </form>
    </div>
  );
};

export default FindId;
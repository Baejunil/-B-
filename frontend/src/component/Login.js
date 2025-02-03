import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ userId: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", form);

      // 서버에서 반환된 JWT를 저장
      const token = response.data.token; // 로그인 성공 시 반환된 JWT
      localStorage.setItem("token", token); // JWT를 LocalStorage에 저장
      console.log(localStorage)
      alert(response.data.message); // 로그인 성공 메시지
      navigate("/home"); // 로그인 후 홈 페이지로 이동
    } catch (error) {
      // 에러 처리
      console.error("로그인 오류:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.error || "로그인에 실패했습니다.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="비밀번호"
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                
                        onClick={toggleShowPassword}
                        style={{
                            position: "absolute",
                            right: "10px",
                            cursor: "pointer",
                            color: "#007bff",
                            userSelect: "none"
                        }}
                    >
                        {showPassword ? "👁️" : "🙈"} {/* 아이콘 변경 */}
                    </span>
              </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
        <p>
          
          🌟 행복한 하루 되세요! 🌟
        </p>
      </footer>
    </div>
  );
};

export default Login;
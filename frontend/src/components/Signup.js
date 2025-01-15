import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup({ setIsLoggedIn }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (!userId || !email || !password) {
      setStatus("모든 필드를 입력해주세요.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("유효한 이메일 주소를 입력해주세요.");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/users/signup", {
        userId,
        email,
        password,
      });
      setStatus("회원가입 성공");
      setIsLoggedIn(true); // 로그인 상태 설정
      navigate("/home"); // 회원가입 후 홈으로 이동
    } catch (error) {
      if (error.response) {
        setStatus(`회원가입 실패: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        setStatus("회원가입 실패: 서버가 응답하지 않습니다.");
      } else {
        setStatus("회원가입 실패: " + error.message);
      }
    }
  };
  
  

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
      <p>{status}</p>
    </div>
  );
}

export default Signup;

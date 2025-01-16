import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    const { userId, email, password } = formData;

    if (!userId || !email || !password) {
      setStatus("모든 필드를 입력해주세요.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post("/users/signup", formData);
      setStatus("회원가입 성공!");
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      console.error("회원가입 오류:", error);
      const errorMessage =
        error.response?.data || "회원가입 실패: 서버와 연결할 수 없습니다.";
      setStatus(errorMessage);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        name="userId"
        placeholder="아이디"
        value={formData.userId}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>회원가입</button>
      <p>{status}</p>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    userId: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthdate: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState(""); // 아이디 중복 메시지
  const [existingIds] = useState(["user1", "user2", "admin"]); // 기존에 사용 중인 아이디 리스트
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.userId) newErrors.userId = "아이디를 입력해주세요.";
    if (!form.email) newErrors.email = "이메일을 입력해주세요.";
    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!form.name) newErrors.name = "이름을 입력해주세요.";
    if (!form.birthdate) newErrors.birthdate = "생년월일을 입력해주세요.";
    if (!form.gender) newErrors.gender = "성별을 선택해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("회원가입 성공!");
      console.log("회원가입 데이터:", form);
    }
  };

  const handleIdCheck = () => {
    if (!form.userId) {
      setIdCheckMessage("아이디를 입력해주세요.");
      setIsIdChecked(false);
      return;
    }

    if (existingIds.includes(form.userId)) {
      setIdCheckMessage("중복된 아이디입니다.");
      setIsIdChecked(false);
    } else {
      setIdCheckMessage("사용 가능한 아이디입니다.");
      setIsIdChecked(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev); // 보기/숨기기 토글
  };

  const isPasswordMatch = form.password === form.confirmPassword; // 비밀번호 일치 여부

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">아이디</label>
          <div className="id-check-wrapper">
            <input
              type="text"
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <button type="button" onClick={handleIdCheck}>
              중복 확인
            </button>
          </div>
          {idCheckMessage && (
            <p className={`id-check-message ${isIdChecked ? "valid" : "error"}`}>
              {idCheckMessage}
            </p>
          )}
          {errors.userId && <p className="error">{errors.userId}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-btn"
            >
              {showPassword ? "숨기기" : "보기"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
          />
          <p
            className={`password-match ${
              isPasswordMatch ? "match" : "mismatch"
            }`}
          >
            {form.confirmPassword
              ? isPasswordMatch
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."
              : ""}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">생년월일</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && <p className="error">{errors.birthdate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <button type="submit" className="btn">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;


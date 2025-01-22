import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import axios from "axios";
import "./Signup.css";

const SignupForm = () => {
    const [form, setForm] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        email: "",
        username: "",
        gender: "",
        birthdate: "",
        joinDate: new Date(),
    });

    const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 상태
    const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호 일치 여부 메시지
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // 비밀번호와 비밀번호 확인 필드의 값이 변경될 때 메시지 업데이트
        if (name === "password" || name === "confirmPassword") {
            if (name === "password" || form.confirmPassword) {
                if (form.password !== value && name === "confirmPassword") {
                    setPasswordMessage("비밀번호가 일치하지 않습니다.");
                } else if (form.confirmPassword !== value && name === "password") {
                    setPasswordMessage("비밀번호가 일치하지 않습니다.");
                } else {
                    setPasswordMessage("비밀번호가 일치합니다.");
                }
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); // 보기/숨기기 토글
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("회원가입 요청 데이터:", form); // 폼 데이터 출력
    
        if (form.password !== form.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/signup", // 백엔드 URL
                form // 요청 데이터
            );
            console.log("응답 데이터:", response.data); // 성공 응답 확인
            alert("회원가입 성공!");
    
            // 여기서 navigate와 로그 실행
            console.log("회원가입 성공, 로그인 페이지로 이동"); // 로그 출력
            navigate("/login"); // 로그인 페이지로 이동
        } catch (error) {
            if (error.response) {
                console.error("에러 응답:", error.response.data); // 서버 에러 로그
                alert(error.response.data.error || "회원가입 실패");
            } else {
                console.error("요청 에러:", error.message);
                alert("요청 처리 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <div>
                <label>아이디:</label>
                <input
                    type="text"
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                />
            </div>
            <div>
                <label>비밀번호:</label>
                <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"} // 보기/숨기기 상태에 따라 type 변경
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요"
                        style={{ flex: 1 }}
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
            <div>
                <label>비밀번호 확인:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호를 다시 입력하세요"
                />
                {passwordMessage && (
                    <p style={{ color: passwordMessage === "비밀번호가 일치합니다." ? "green" : "red" }}>
                        {passwordMessage}
                    </p>
                )}
            </div>
            <div>
                <label>이메일:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                />
            </div>
            <div>
                <label>이름:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                />
            </div>
            <div>
                <label>성별:</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
            </div>
            <div>
                <label>생년월일:</label>
                <input
                    type="date"
                    name="birthdate"
                    value={form.birthdate}
                    onChange={handleChange}
                />
                
            </div>
            
            <button type="submit">회원가입</button>
        </form>
        
    );
};

export default SignupForm;
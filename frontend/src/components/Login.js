import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [form, setForm] = useState({ userId: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", form);

            // 서버가 반환한 응답 확인
            if (response.data && response.data.message) {
                alert(response.data.message); // 성공 메시지 표시
            } else {
                alert("서버 응답 형식이 올바르지 않습니다.");
            }
        } catch (error) {
            // 에러 처리
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error); // 에러 메시지 표시
            } else {
                alert("예상치 못한 에러가 발생했습니다.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="userId"
                placeholder="아이디"
                value={form.userId}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
            />
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;

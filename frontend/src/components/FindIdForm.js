import React, { useState } from "react";
import axios from "axios";

const FindIdForm = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // 찾은 아이디 저장
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 저장

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // 이전 에러 메시지 초기화
        setUserId(""); // 이전 아이디 초기화

        try {
            const response = await axios.post("http://localhost:8080/api/users/find-id", { email });
            setUserId(response.data.userId); // 성공 시 아이디 저장
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error || "아이디 찾기 실패"
            ); // 에러 메시지 설정
        }
    };

    return (
        <div>
            <h2>아이디 찾기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="가입한 이메일을 입력하세요"
                        required
                    />
                </div>
                <button type="submit">아이디 찾기</button>
            </form>
            {userId && (
                <div>
                    <h3>찾은 아이디:</h3>
                    <p>{userId}</p>
                </div>
            )}
            {errorMessage && (
                <div style={{ color: "red" }}>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default FindIdForm;
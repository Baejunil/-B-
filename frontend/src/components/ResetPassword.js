import React, { useState } from 'react';
import axios from 'axios';

const FindPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/find-password', { email });
            alert('비밀번호 초기화 이메일이 전송되었습니다.');
        } catch (error) {
            alert('비밀번호 찾기 실패: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">비밀번호 찾기</button>
        </form>
    );
};

export default FindPasswordForm;

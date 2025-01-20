import React, { useState } from 'react';
import axios from 'axios';

const FindIdForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/find-id', { email });
            alert('아이디: ' + response.data.userId);
        } catch (error) {
            alert('아이디 찾기 실패: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">아이디 찾기</button>
        </form>
    );
};

export default FindIdForm;

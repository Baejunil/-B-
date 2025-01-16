import React, { useState } from 'react';

function FindId() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 나중에 백엔드 API 호출 부분
    console.log('아이디 찾기 이메일:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>아이디 찾기</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">아이디 찾기</button>
    </form>
  );
}

export default FindId;

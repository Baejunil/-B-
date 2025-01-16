import React, { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 나중에 백엔드 API 호출 부분
    console.log('비밀번호 찾기 이메일:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>비밀번호 찾기</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">비밀번호 찾기</button>
    </form>
  );
}

export default ResetPassword;


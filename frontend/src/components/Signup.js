import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // 백엔드와 통신하는 axios 인스턴스

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 입력값 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 아이디 중복 확인
  const checkUsernameAvailability = async () => {
    try {
      const response = await axiosInstance.post('/check-username', { username: formData.username });
      if (response.data.available) {
        setIsUsernameAvailable(true);
        setErrorMessage('');
      } else {
        setIsUsernameAvailable(false);
        setErrorMessage('사용할 수 없는 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      setErrorMessage('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUsernameAvailable) {
      setErrorMessage('아이디 중복 확인을 완료해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 백엔드로 회원가입 요청
      await axiosInstance.post('/signup', formData);
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrorMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>

      <label>
        아이디:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={checkUsernameAvailability}>
          중복 확인
        </button>
      </label>
      {isUsernameAvailable === false && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isUsernameAvailable === true && <p style={{ color: 'green' }}>사용 가능한 아이디입니다.</p>}

      <label>
        이메일:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        비밀번호:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        비밀번호 확인:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
      {formData.password !== formData.confirmPassword && (
        <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
      )}

      <button type="submit">회원가입</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default Signup;

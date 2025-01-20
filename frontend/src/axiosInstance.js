// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/' // 스프링 부트 백엔드 서버의 기본 URL
});

export default instance;

// SignUp.js 또는 회원가입 처리 컴포넌트
import axios from './axiosInstance';

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = {/* 폼 데이터 객체 */}; // form 데이터는 이 예제에서 정의되어야 합니다.

  try {
      const response = await axios.post('users/register', form);
      alert('회원가입 성공!');
      console.log(response.data); // 서버로부터의 응답을 콘솔에 출력
  } catch (error) {
      if (error.response) {
          console.error('회원가입 실패:', error.response.data);
      } else {
          console.error('Error:', error.message);
      }
  }
};

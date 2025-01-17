import axios from 'axios';
import axios from './axiosInstance';

// Form submit function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await axios.post('/users/register', form);
      alert('회원가입 성공!');
  } catch (error) {
      console.error('회원가입 실패:', error.response.data);
  }
};

const instance = axios.create({
    baseURL: 'http://localhost:8081/login'
});

export default instance;

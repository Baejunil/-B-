import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log(`[요청] ${config.method.toUpperCase()} ${config.url}`, config);
    if (
      token &&
      !config.url.includes('/users/signup') &&
      !config.url.includes('/users/login')
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API 에러: ${error.response.status} - ${error.response.data}`);
      if (error.response.status === 401) {
        console.warn('인증 실패: 토큰이 만료되었거나 유효하지 않습니다.');
        localStorage.removeItem('authToken');
        alert('로그인이 필요합니다. 다시 로그인하세요.');
        window.location.href = '/login';
      } else {
        alert(`에러 발생: ${error.response.data.message || '서버에서 처리 중 에러가 발생했습니다.'}`);
      }
    } else {
      console.error('서버 연결 실패:', error.message);
      alert('서버와 연결할 수 없습니다. 네트워크를 확인하세요.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

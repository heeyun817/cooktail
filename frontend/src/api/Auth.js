import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/members/login', {
      email,
      password,
    });

    if (response.status === 200) {
      // 토큰을 쿠키에 저장
      document.cookie = `token=${response.data.token}; path=/;`;
      return { token: response.data.token, memberId: response.data.memberId };
    } else {
      throw new Error('로그인 실패');
    }
  } catch (error) {
    console.error('로그인 중 에러 발생:', error.message);
    throw error;
  }
};

// 쿠키에서 토큰을 가져오는 함수를 추가
export const getToken = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return value;
    }
  }
  return null;
};

// 로그아웃 시 쿠키에서 토큰을 제거하는 함수를 추가
export const logout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  localStorage.removeItem('memberId');
};

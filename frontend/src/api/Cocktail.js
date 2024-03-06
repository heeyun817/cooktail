import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
  // 모든 글 조회, 검색
export const getAllCocktails = async ({ page = 0, perPage = 8, sortBy = 'createdAt', keyword } = {}) => {
  try {
    const response = await api.get('/cocktails', {
      params: {
        page,
        size: perPage,
        sort: sortBy,
        keyword,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cocktails: ${error.message}`);
  }
};

  // id로 조회
  export const getCocktailById = async (id) => {
    try {
      const response = await api.get(`/cocktails/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cocktail by id: ${error.message}`);
    }
  };
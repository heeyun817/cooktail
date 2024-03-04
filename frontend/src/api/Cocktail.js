import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCocktails = async ({ page = 0, perPage = 8, sortBy = 'createdAt' } = {}) => {
  try {
    const response = await api.get('/cocktails', {
      params: {
        page,
        size: perPage,
        sort: sortBy,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cocktails: ${error.message}`);
  }
};
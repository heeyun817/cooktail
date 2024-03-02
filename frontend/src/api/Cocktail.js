import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCocktails = async ({ sortBy = null } = {}) => {
  try {
    const response = await api.get('/cocktails', {
      params: {
        ...(sortBy !== null && { sort: sortBy })
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cocktails: ${error.message}`);
  }
};

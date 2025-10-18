import axios from 'axios';

export const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const localApi = axios.create({
  baseURL: 'http://localhost:3000',
});

localApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

localApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado, limpa o localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
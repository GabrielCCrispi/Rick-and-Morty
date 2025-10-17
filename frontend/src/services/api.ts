import axios from 'axios';

export const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const localApi = axios.create({
  baseURL: 'http://localhost:3000',
});

localApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
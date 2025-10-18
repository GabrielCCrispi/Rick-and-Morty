import axios from 'axios';

export const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const localApi = axios.create({
  baseURL: 'http://localhost:3000',
});
 
localApi.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      config.headers['user-id'] = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
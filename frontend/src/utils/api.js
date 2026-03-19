import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000 // 10 seconds timeout
});

api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

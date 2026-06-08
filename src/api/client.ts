import axios from 'axios';
import { useAppStore } from '../store/appStore';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      useAppStore.getState().init();
    }
    return Promise.reject(error);
  }
);
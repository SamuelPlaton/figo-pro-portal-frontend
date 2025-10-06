import axios from 'axios';
import { ROUTES } from '@/types';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
// eslint-disable-next-line
let failedQueue: { resolve: Function; reject: Function }[] = [];

// eslint-disable-next-line
const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
        isRefreshing = false;
        processQueue(null);
        return apiClient(originalRequest); // retry
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        // if refresh token fails, logout
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        if (typeof window !== 'undefined') {
          window.location.href = ROUTES.SIGNIN;
        }

        return Promise.reject(refreshError);
      }
    }

    // if 2nd try of the request fails, logout
    if (err.response?.status === 401 && originalRequest._retry) {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (typeof window !== 'undefined') window.location.href = ROUTES.SIGNIN;
    }

    return Promise.reject(err);
  },
);

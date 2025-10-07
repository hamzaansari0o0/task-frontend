// src/utils/api.js

import axios from "axios";

// ✅ URL ab environment variable se aa raha hai
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${baseURL}/api/users`, 
  withCredentials: true,
});

// Interceptor mein koi change nahi, woh waisa hi rahega
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${baseURL}/api/users/refresh`, {}, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed ❌", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
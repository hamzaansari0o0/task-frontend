// src/utils/apiAdmin.js

import axios from "axios";

// ✅ URL ab environment variable se aa raha hai
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiAdmin = axios.create({
  baseURL: `${baseURL}/api/admin`,
  withCredentials: true,
});

// Interceptor logic bilkul theek hai, bas ab yeh dynamic baseURL istemal karega
apiAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Naya token lene ke liye refresh endpoint call karein
        await axios.post(
          `${baseURL}/api/users/refresh`,
          {},
          { withCredentials: true }
        );
        // Original request dobara try karein
        return apiAdmin(originalRequest);
      } catch (refreshError) {
        console.error("Admin API refresh token failed ❌:", refreshError.message);
        // Agar refresh fail ho to user ko signin page par bhej dein
        window.location.href = "/signin"; 
      }
    }
    return Promise.reject(error);
  }
);

export default apiAdmin;
// src/utils/apiTask.js

import axios from "axios";

// ✅ URL ab environment variable se aa raha hai
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiTask = axios.create({
  baseURL: `${baseURL}/api/tasks`,
  withCredentials: true,
});

// PDF file upload karne ka function
export const uploadTaskFile = (taskId, formData) => {
  return apiTask.post(`/${taskId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Interceptor mein koi change nahi
apiTask.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${baseURL}/api/users/refresh`,
          {},
          { withCredentials: true }
        );
        return apiTask(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed ❌", refreshError);
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default apiTask;
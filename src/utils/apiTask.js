import axios from "axios";

// ✅ Backend URL ko hardcode kar diya gaya hai
const baseURL = "https://task-backend-iota-beige.vercel.app";

// Yeh instance sirf tasks se related API calls ke liye hai
const apiTask = axios.create({
  baseURL: `${baseURL}/api/tasks`, // <-- Base URL sirf tasks tak
  withCredentials: true,
});

// Response interceptor for handling expired access tokens
apiTask.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar token expire ho gaya (401) aur yeh pehli koshish hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Naya access token hasil karne ke liye refresh endpoint call karein
        await axios.post(
          `${baseURL}/api/users/refresh`, // <-- Yahan bhi URL update kiya gaya
          {},
          { withCredentials: true }
        );
        // Original request dobara try karein
        return apiTask(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed ❌", refreshError);
        // Agar refresh bhi fail ho jaye to login page par bhej dein
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default apiTask;
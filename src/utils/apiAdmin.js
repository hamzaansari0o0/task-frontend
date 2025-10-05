// // utils/apiAdmin.js
// import axios from "axios";

// const apiAdmin = axios.create({
//   baseURL: "http://localhost:5000/api/admin",
//   withCredentials: true, // cookies bhejne ke liye zaroori
// });

// // Response interceptor
// apiAdmin.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Agar access token expire ho gaya (401 mila)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Refresh token request (user wala hi route use karna hai)
//         await axios.post(
//           "http://localhost:5000/api/users/refresh",
//           {},
//           { withCredentials: true }
//         );

//         // Retry original request
//         return apiAdmin(originalRequest);
//       } catch (refreshError) {
//         console.error("Admin refresh token failed ❌", refreshError);
//         window.location.href = "/signin";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiAdmin;
////////////////////////////////////////////////////
import axios from "axios";

// ✅ URL direct code mein likh diya gaya hai
const baseURL = "https://task-backend-iota-beige.vercel.app";

const apiAdmin = axios.create({
  baseURL: `${baseURL}/api/admin`,
  withCredentials: true,
});

apiAdmin.interceptors.response.use(
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
        return apiAdmin(originalRequest);
      } catch (refreshError) {
        console.error("Admin refresh token failed ❌", refreshError);
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default apiAdmin;
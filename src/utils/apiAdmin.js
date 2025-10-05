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

// ✅ baseURL ab environment variable se aayega
const baseURL = process.env.REACT_APP_API_URL;

const apiAdmin = axios.create({
  baseURL: `${baseURL}/api/admin`, // ✅ CHANGE HERE
  withCredentials: true,
});

apiAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // ✅ Refresh URL bhi ab dynamic hai
        await axios.post(
          `${baseURL}/api/users/refresh`, // ✅ CHANGE HERE
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
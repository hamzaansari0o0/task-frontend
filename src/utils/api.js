// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/users", // tumhara backend users route
//   withCredentials: true, // cookies allow
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // ✅ POST request instead of GET
//         await axios.post("http://localhost:5000/api/users/refresh", {}, {
//           withCredentials: true,
//         });
//         return api(originalRequest); // retry karega
//       } catch (err) {
//         console.error("Refresh token failed ❌", err);
//         // optional: logout ya login page redirect
//       }
//     }

//     return Promise.reject(error);
//   }
// );



// export default api;
//////////////////////////////////////////////////////////////
// utils/api.js (Updated)import axios from "axios";

// ✅ URL direct code mein likh diya gaya hai
const baseURL = "https://task-backend-iota-beige.vercel.app";

const api = axios.create({
  baseURL: `${baseURL}/api/users`, 
  withCredentials: true,
});

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
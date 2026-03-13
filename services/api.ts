// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const api = axios.create({
//   baseURL: "https://api.example.com",
// });

// // Request interceptor to add access token
// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync("accessToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Response interceptor to handle 401 (token expired)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 and not already retried
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Get refresh token
//       const refreshToken = await SecureStore.getItemAsync("refreshToken");
//       if (!refreshToken) throw error;

//       // Call refresh token endpoint
//       const res = await axios.post("https://api.example.com/refresh-token", {
//         refreshToken,
//       });

//       if (res.status === 200) {
//         // Save new access token
//         await SecureStore.setItemAsync("accessToken", res.data.accessToken);

//         // Retry original request
//         originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
//         return api(originalRequest);
//       }
//     }

//     throw error;
//   }
// );

// export default api;

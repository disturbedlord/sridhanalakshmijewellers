import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { BackendAPI } from "../components/common";

const api = axios.create({
  baseURL: BackendAPI,
});

/* REQUEST INTERCEPTOR */

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axios.post(`${BackendAPI}/auth/refreshToken`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        await SecureStore.setItemAsync("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

/* ---------------- GENERIC API METHODS ---------------- */

export const getRequest = async <T>(url: string, params?: any): Promise<T> => {
  try {
    const res = await api.get<T>(url, { params });
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const postRequest = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const res = await api.post<T>(url, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const putRequest = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const res = await api.put<T>(url, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const deleteRequest = async (
  url: string,
  config?: any,
): Promise<void> => {
  try {
    await api.delete(url, config);
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export default api;

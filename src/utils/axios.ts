import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    `http://localhost:${import.meta.env.VITE_PORT}`,
});

// 请求拦截器自动添加token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器处理token过期
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuth.getState().signOut?.();
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;

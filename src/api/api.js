import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, ""), 
  withCredentials: true,
});

API.interceptors.request.use((config) => {

  if (
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register") &&
    !config.url.includes("/auth/forgot-password")
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;

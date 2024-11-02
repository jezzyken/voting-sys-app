import axios from "axios";
import authConfig from "@/config/auth.config";
import router from "@/router";
import store from "@/store";
import { config } from "../config/baseURL";

const axiosInstance = axios.create({
  baseURL: config,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(authConfig.tokenKey);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch("auth/logout");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

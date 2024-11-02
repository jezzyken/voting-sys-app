import axios from "@/plugins/axios";
import authConfig from "@/config/auth.config";
import router from "@/router";
import { baseURL } from "../../config/baseURL";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem(authConfig.tokenKey) || null,
    user: JSON.parse(localStorage.getItem(authConfig.userKey)) || null,
    loading: false,
    error: null,
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await api.post("/auth/login", credentials);
        const { token, user } = response.data;

        localStorage.setItem(authConfig.tokenKey, token);
        localStorage.setItem(authConfig.userKey, JSON.stringify(user));

        commit("SET_TOKEN", token);
        commit("SET_USER", user);

        router.push("/");
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || "Login failed");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    logout({ commit }) {
      localStorage.removeItem(authConfig.tokenKey);
      localStorage.removeItem(authConfig.userKey);
      commit("CLEAR_AUTH");
      router.push("/login");
    },

    async checkAuth({ commit }) {
      try {
        const response = await api.get("/auth/me");
        commit("SET_USER", response.data.data);
      } catch (error) {
        commit("CLEAR_AUTH");
        router.push("/login");
      }
    },
  },
};

import axios from "axios";

import { baseURL } from "../../config/baseURL";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const state = {
  isLoggedIn: false,
  studentId: null,
  studentInfo: null,
  error: null,
  initialized: false,
};

const mutations = {
  SET_LOGGED_IN(state, { isLoggedIn, studentId }) {
    state.isLoggedIn = isLoggedIn;
    state.studentId = studentId;
    console.log(isLoggedIn, studentId);
  },
  SET_STUDENT_INFO(state, info) {
    state.studentInfo = info;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_INITIALIZED(state, value) {
    state.initialized = value;
  },
};

const actions = {
  async login({ commit }, { studentId, otp }) {
    try {
      let response;
      if (!otp) {
        response = await api.post("/student/initiate-login", {
          studentId,
        });
        if (response.data.status === "success") {
          return { showOtp: true, message: response.data.message };
        }
      } else {
        response = await api.post("/student/verify-otp", {
          studentId,
          otp,
        });

        if (response.data.status === "success") {
          commit("SET_LOGGED_IN", { isLoggedIn: true, studentId });
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("studentId", response.data.student.id);
          return { showOtp: false, message: response.data.message };
        }
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
      commit("SET_ERROR", error.message);
      return { error: error.message };
    }
  },

  logout({ commit }) {
    commit("SET_LOGGED_IN", { isLoggedIn: false, studentId: null });
    commit("SET_STUDENT_INFO", null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentId");
  },

  checkLoginStatus({ commit }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const studentId = localStorage.getItem("studentId");
    commit("SET_LOGGED_IN", { isLoggedIn, studentId });
    commit("SET_INITIALIZED", true);
  },
  initializeApp({ dispatch, state }) {
    if (!state.initialized) {
      return dispatch("checkLoginStatus");
    }
  },

  async fetchStudentInfo({ commit, state }) {
    if (state.studentId) {
      try {
        const response = await api.get(`/api/student/${state.studentId}`);
        commit("SET_STUDENT_INFO", response.data);
      } catch (error) {
        commit("SET_ERROR", error.message);
      }
    }
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  studentId: (state) => state.studentId,
  error: (state) => state.error,
  isInitialized: (state) => state.initialized,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

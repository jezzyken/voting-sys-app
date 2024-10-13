export default {
  namespaced: true,
  state: {
    drawer: true,
    mini: false,
  },
  mutations: {
    setDrawer(state, value) {
      state.drawer = value;
    },
    setMini(state, value) {
      state.mini = value;
    },
    toggleMini(state) {
      state.mini = !state.mini;
    },
  },
};
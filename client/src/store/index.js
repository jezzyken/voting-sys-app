import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import student from './modules/student'
import auth from './modules/auth'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    student,
    auth
  },
});
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import { baseURL, currentEnv } from './config/baseURL';

Vue.config.productionTip = false;

axios.defaults.baseURL = baseURL;

Vue.prototype.$http = axios;
Vue.prototype.$baseURL = baseURL;
Vue.prototype.$currentEnv = currentEnv;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
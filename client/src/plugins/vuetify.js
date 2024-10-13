import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2E2F5B',    // Dark Navy
        secondary: '#505581',  // Medium Blue
        accent: '#F4D35E',     // Yellow
        info: '#FAF0CA',       // Light Cream
      },
      dark: {
        primary: '#2E2F5B',
        secondary: '#505581',
        accent: '#F4D35E',
        info: '#FAF0CA',
      },
    },
  },
});

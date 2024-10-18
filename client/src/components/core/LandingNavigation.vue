<!-- src/components/core/LandingNavigation.vue -->
<template>
  <v-app-bar
    app
    absolute
    :class="[
      {'v-app-bar--transparent': !isScrolled},
      {'v-app-bar--scrolled': isScrolled},
      'transparent-overlay'
    ]"
  >
    <v-container class="py-0 fill-height">
      <v-avatar
        class="mr-10"
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-btn text to="/" exact>Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/features">Features</v-btn>
      <v-btn text to="/contact">Contact</v-btn>

      <v-spacer></v-spacer>

      <v-btn text @click="login">Login</v-btn>
      <v-btn 
        :color="isScrolled ? 'primary' : 'white'" 
        :text="!isScrolled" 
        :outlined="!isScrolled"
        @click="register"
      >
        Register
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'LandingNavigation',
  data() {
    return {
      isScrolled: false,
      scrollThreshold: 50,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.pageYOffset > this.scrollThreshold;
    },
    login() {
      console.log('Navigating to login page');
    },
    register() {
      console.log('Navigating to registration page');
    }
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
}

.v-app-bar {
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.v-app-bar--transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}

.v-app-bar--scrolled {
  background-color: white !important;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important;
}

.transparent-overlay {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-app-bar--transparent .v-btn:not(.v-btn--outlined) {
  color: white;
}

.v-app-bar--transparent .v-btn--outlined {
  border-color: white;
  color: white;
}

.v-app-bar--scrolled .v-btn:not(.v-btn--outlined) {
  color: rgba(0, 0, 0, 0.87);
}

.v-app-bar--scrolled .v-btn--outlined {
  border-color: currentColor;
}
</style>
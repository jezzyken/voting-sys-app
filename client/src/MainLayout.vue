<template>
  <v-app>
    <Navigation />
    <AppBar />
    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/core/Navigation.vue";
import AppBar from "@/components/core/AppBar.vue";

export default {
  components: {
    Navigation,
    AppBar,
  },
};
</script>

<style>
.v-main {
  background-color: #f5f5f5;
}
</style>

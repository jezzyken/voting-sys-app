<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>GITVote</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="handleLogout">Logout</v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("student", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/portal/login");
    },
  },
};
</script>

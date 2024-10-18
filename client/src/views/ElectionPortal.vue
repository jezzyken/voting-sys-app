<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>GITVote</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/portal/login");
    },
  },
};
</script>

<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-app-bar-nav-icon @click.stop="toggleMini"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-h6 font-weight-bold">
      {{ currentPageTitle }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-menu
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar size="36">
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in userMenuItems"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'AppBar',
  data() {
    return {
      userMenuItems: [
        { title: 'Profile', action: this.goToProfile },
        { title: 'Settings', action: this.goToSettings },
        { title: 'Logout', action: this.logout },
      ],
    };
  },
  computed: {
    currentPageTitle() {
      return this.$route.name || 'Dashboard';
    },
  },
  methods: {
    ...mapMutations('app', ['toggleMini']),
    goToProfile() {
      // Implement profile navigation
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    logout() {
      // Implement logout functionality
    },
  },
};
</script>
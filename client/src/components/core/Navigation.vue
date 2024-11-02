# components/core/Navigation.vue
<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    app
    permanent
    class="primary darken-1"
    dark
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-avatar color="primary" size="40">
          <span class="white--text text-caption">{{ userInitials }}</span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-title class="text-h6">{{ userName }}</v-list-item-title>

      <v-btn icon @click.stop="toggleMini">
        <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <template v-for="item in menuItems">
        <v-list-group
          v-if="item.children"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          :append-icon="item.children ? 'mdi-chevron-down' : ''"
          :active-class="isGroupActive(item) ? 'active-group' : ''"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.path"
            :exact="true"
            link
            active-class="active-item"
          >
            <v-list-item-icon v-if="child.icon">
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="item.title"
          :to="item.path"
          :exact="true"
          link
          active-class="active-item"
          @click="item.action ? item.action() : null"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapState("app", ["drawer", "mini"]),
    ...mapGetters("auth", ["user"]),
    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(value) {
        this.$store.commit("app/setDrawer", value);
      },
    },
    userName() {
      return this.user?.name || "Admin";
    },

    userInitials() {
      if (!this.user?.name) return "A";

      return this.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },
    menuItems() {
      return [
        { title: "Dashboard", path: "/", icon: "mdi-view-dashboard" },
        {
          title: "Section",
          path: "/section",
          icon: "mdi-google-classroom",
        },
        { title: "Programs", path: "/programs", icon: "mdi-book-education" },
        { title: "Students", path: "/students", icon: "mdi-account-school" },
        { title: "Party", path: "/party", icon: "mdi-account-group" },
        { title: "Elections", path: "/elections", icon: "mdi-vote" },
        { title: "Candidates", path: "/candidates", icon: "mdi-account-star" },
        { title: "Election Page", path: "/election/view", icon: "mdi-poll" },
        { title: "Users", path: "/users", icon: "mdi-account-plus" },
        { title: "Reports", path: "/reports", icon: "mdi-file-chart" },
        // {
        //   title: "Reports",
        //   icon: "mdi-file-chart",
        //   children: [
        //     {
        //       title: "Sales Report",
        //       path: "/reports/sales",
        //       icon: "mdi-currency-usd",
        //     },
        //     {
        //       title: "User Activity",
        //       path: "/reports/activity",
        //       icon: "mdi-chart-line",
        //     },
        //   ],
        // },
        { title: "Logout", icon: "mdi-logout", action: this.logoutUser },
      ];
    },
  },
  methods: {
    ...mapMutations("app", ["toggleMini"]),
    ...mapActions("auth", ["login", "logout"]),
    isGroupActive(item) {
      if (item.children) {
        return item.children.some((child) =>
          this.$route.path.startsWith(child.path)
        );
      }
      return false;
    },
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.v-list-item--active {
  color: yellow !important;
}

.active-item {
  background-color: rgba(255, 255, 0, 0.15) !important;
}

.active-item::before {
  opacity: 0 !important;
}

.active-group > .v-list-group__header {
  background-color: rgba(255, 255, 0, 0.1) !important;
}

.active-group > .v-list-group__header .v-list-item__icon,
.active-group > .v-list-group__header .v-list-item__title {
  color: yellow !important;
}

.v-list-item:hover,
.v-list-group__header:hover {
  background-color: rgba(255, 255, 255, 0.07) !important;
}

.v-list-group__header.v-list-item--active:hover {
  background-color: rgba(255, 255, 0, 0.2) !important;
}

.v-list-item__icon {
  margin-right: 16px;
}

.v-list-group__header.v-list-item--active .v-list-item__icon {
  color: yellow !important;
}

.v-list-group__header .v-list-group__header__append-icon .v-icon {
  color: inherit;
}

.v-list-group--active
  > .v-list-group__header
  .v-list-group__header__append-icon
  .v-icon {
  transform: rotate(-180deg);
}

.v-list-group__items .v-list-item {
  padding-left: 16px;
}

/* New styles for yellow active items */
.active-item .v-list-item__title,
.active-item .v-list-item__icon {
  color: yellow !important;
}

.v-list-group--active > .v-list-group__header {
  border-left: 3px solid yellow;
}
</style>

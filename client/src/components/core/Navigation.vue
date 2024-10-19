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
        <v-img
          src="https://lh3.googleusercontent.com/a/ACg8ocLdHlNO2csW9twKE8giqa_NnbUqNvbNCj1neZUr1IH7WbvanFI=s83-c-mo"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title class="text-h6">KenJS</v-list-item-title>

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
import { mapState, mapMutations } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapState("app", ["drawer", "mini"]),
    drawer: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(value) {
        this.$store.commit("app/setDrawer", value);
      },
    },
    menuItems() {
      return [
        { title: "Dashboard", path: "/", icon: "mdi-view-dashboard" },
        { title: "Classroom", path: "/classroom", icon: "mdi-cog" },
        { title: "Programs", path: "/programs", icon: "mdi-cog" },
        { title: "Students", path: "/students", icon: "mdi-cog" },
        // { title: "Positions", path: "/positions", icon: "mdi-cog" },
        { title: "Party", path: "/party", icon: "mdi-cog" },
        { title: "Elections", path: "/elections", icon: "mdi-cog" },
        { title: "Candidates", path: "/candidates", icon: "mdi-cog" },
        { title: "Election Page", path: "/election/view", icon: "mdi-cog" },
        {
          title: "Users",
          icon: "mdi-account-group",
          children: [
            {
              title: "List Users",
              path: "/users",
              icon: "mdi-format-list-bulleted",
            },
            { title: "Add User", path: "/users/add", icon: "mdi-account-plus" },
          ],
        },
        {
          title: "Reports",
          icon: "mdi-file-chart",
          children: [
            {
              title: "Sales Report",
              path: "/reports/sales",
              icon: "mdi-currency-usd",
            },
            {
              title: "User Activity",
              path: "/reports/activity",
              icon: "mdi-chart-line",
            },
          ],
        },
        { title: "Logout", icon: "mdi-logout", action: this.logout },
      ];
    },
  },
  methods: {
    ...mapMutations("app", ["toggleMini"]),
    isGroupActive(item) {
      if (item.children) {
        return item.children.some((child) =>
          this.$route.path.startsWith(child.path)
        );
      }
      return false;
    },
    logout() {
      localStorage.removeItem("adminLoggedIn");
      this.$router.push("/login");
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

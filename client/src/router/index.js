import Vue from "vue";
import VueRouter from "vue-router";

// Import layouts
import MainLayout from "../MainLayout.vue";
import FullPageLayout from "../FullPageLayout.vue";

// Import views
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "users",
        name: "Users",
        component: () => import("../views/Users.vue"),
      },
      {
        path: "users/add",
        name: "AddUser",
        component: () => import("../views/AddUser.vue"),
      },
      {
        path: "programs",
        name: "Programs",
        component: () => import("../views/Programs.vue"),
      },
      {
        path: "students",
        name: "Students",
        component: () => import("../views/Students.vue"),
      },
      {
        path: "positions",
        name: "Positions",
        component: () => import("../views/Positions.vue"),
      },
      {
        path: "elections",
        name: "Elections",
        component: () => import("../views/Elections.vue"),
      },
      {
        path: "candidates",
        name: "Candidates",
        component: () => import("../views/Candidates.vue"),
      },
      {
        path: "votes",
        name: "Votes",
        component: () => import("../views/Votes.vue"),
      },
      {
        path: "party",
        name: "Party",
        component: () => import("../views/Party.vue"),
      },
      {
        path: "classroom",
        name: "Classroom",
        component: () => import("../views/Classroom.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
      },
    ],
  },
  {
    path: "/election/view",
    component: FullPageLayout,
    children: [
      {
        path: "",
        name: "Landing Page",
        component: () => import("../views/ElectionLandingPage.vue"),
      },
    ],
  },
  {
    path: "/portal/login",
    component: FullPageLayout,
    children: [
      {
        path: "",
        name: "Portal Login Page",
        component: () => import("../views/PortalLoginForm.vue"),
      },
    ],
  },
  {
    path: "/election/portal",
    component: FullPageLayout,
    children: [
      {
        path: "",
        name: "Portal Login Page",
        component: () => import("../views/ElectionPortal.vue"),
        children: [
          {
            path: "",
            name: "Portal Dashboard",
            component: () => import("../views/ElectionPortalDashboard.vue"),
          },
          {
            path: "candidates",
            name: "Candidates Page",
            component: () => import("../views/CandidatesPage.vue"),
          },
        ],
      },
    ],
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: () => import('../views/AddUser.vue'),
  },
  {
    path: '/programs',
    name: 'Programs',
    component: () => import('../views/Programs.vue'),
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('../views/Students.vue'),
  },
  {
    path: '/positions',
    name: 'Positions',
    component: () => import('../views/Positions.vue'),
  },
  {
    path: '/elections',
    name: 'Elections',
    component: () => import('../views/Elections.vue'),
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: () => import('../views/Candidates.vue'),
  },
  {
    path: '/votes',
    name: 'Votes',
    component: () => import('../views/Votes.vue'),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

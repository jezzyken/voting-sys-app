import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

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
    meta: { requiresAuth: true },
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
        path: "courses",
        name: "Courses",
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
        path: "section",
        name: "Section",
        component: () => import("../views/Classroom.vue"),
      },
      {
        path: "/candidates-list/:id",
        name: "Candidate Lists",
        component: () => import("../views/CandidatesListPage.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
      },
      {
        path: "/election/results/:id/view",
        name: "View Results",
        component: () => import('@/views/ElectionResults.vue')
      },
      {
        path: '/election/:id/partial-results',
        name: 'PartialResults',
        component: () => import('@/views/PartialResults.vue')
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import('@/views/VotingReport.vue')
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
      {
        path: "partial-results/:id", 
        name: "View Partial Landing",
        component: () => import("@/views/PartialResults.vue"),
      },
      {
        path: "results/:id", 
        name: "View Results Landing", 
        component: () => import("@/views/ElectionResults.vue"),
      }
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
          {
            path: "votes/:id",
            name: "Vote Page",
            component: () => import("../views/ElectionCandidatesPage.vue"),
          },
          {
            path: '/election/success/:id',
            name: 'VoteSuccess',
            component: () => import('@/views/VoteSuccess.vue')
          },
          {
            path: '/election/already-voted/:id',
            name: 'AlreadyVoted',
            component: () => import('@/views/AlreadyVoted.vue')
          },
          {
            path: '/election/results/:id',
            name: 'Election Results',
            component: () => import('@/views/ElectionResults.vue')
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    component: FullPageLayout,
    children: [
      {
        path: "",
        name: "AdminLogin",
        component: () => import("../views/LoginView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isPublic = to.matched.some(record => record.meta.public);
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (isAuthenticated && isPublic) {
    next('/');
  } else {
    next();
  }
})

router.beforeEach(async (to, from, next) => {
  if (!store.getters['student/isInitialized']) {
    await store.dispatch('student/initializeApp')
  }
  const isLoggedIn = store.getters['student/isLoggedIn']
  if (to.path.startsWith('/election/portal') && !isLoggedIn) {
    next('/portal/login')
  } else if (to.path === '/portal/login' && isLoggedIn) {
    next('/election/portal')
  } else {
    next()
  }
})


export default router;

import { createRouter, createWebHistory } from "vue-router";
import MMA from "../pages/MMA.vue";
import Soccer from "../pages/Soccer.vue";
import Fight from "../pages/Fight.vue";
import MyBets from "../pages/MyBets.vue";
import Wallet from "../pages/Wallet.vue";
import News from "../pages/News.vue";
import Profile from "../pages/Profile.vue";

const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "events"
  },
  {
    path: "/mma",
    name: "mma",
    meta: {
      authReq: false,
    },
    component: MMA,
  },
  {
    path: "/soccer",
    name: "soccer",
    meta: {
      authReq: false,
    },
    component: Soccer,
  },
  {
    path: "/fight/:id",
    name: "fight",
    meta: {
      authReq: false,
    },
    component: Fight,
  },
  {
    path: "/my-bets",
    name: "my-bets",
    meta: {
      authReq: true,
    },
    component: MyBets,
  },
  {
    path: "/wallet",
    name: "wallet",
    meta: {
      authReq: true,
    },
    component: Wallet,
  },
  {
    path: "/news",
    name: "news",
    meta: {
      authReq: false,
    },
    component: News,
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      authReq: true,
    },
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

// router.beforeEach(async (to, from) => {
//   if (
//     to.meta.authReq === true &&
//     !isAuthenticated() 
//   ) {
//     return { name: 'events' }
//   }
// })

export default router;

import { createRouter, createWebHistory } from "vue-router";
import MMA from "../pages/MMAPage.vue";
import Soccer from "../pages/SoccerPage.vue";
import Fight from "../pages/FightPage.vue";
import MyBets from "../pages/MyBetsPage.vue";
import Wallet from "../pages/WalletPage.vue";
import News from "../pages/NewsPage.vue";
import Profile from "../pages/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "mma",
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

export default router;

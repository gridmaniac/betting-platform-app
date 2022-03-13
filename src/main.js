import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Layout from "./components/Layout.vue";
import Index from "./pages/Index.vue";
import MyBets from "./pages/MyBets.vue";
import Wallet from "./pages/Wallet.vue";
import News from "./pages/News.vue";
import "./index.css";

const routes = [
  { path: "/", component: Index },
  { path: "/my-bets", component: MyBets },
  { path: "/wallet", component: Wallet },
  { path: "/news", component: News },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(Layout);
app.use(router);
app.mount("#app");

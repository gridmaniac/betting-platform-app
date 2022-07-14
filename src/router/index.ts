import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import MMAPage from "../pages/MMAPage.vue";
import SoccerPage from "../pages/SoccerPage.vue";
import BetsPage from "../pages/BetsPage.vue";
import WalletPage from "../pages/WalletPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import NewsPage from "../pages/NewsPage.vue";

import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";

import { EmailConfirmSucces} from "@/composables/ModalNotifications"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      redirect: { name: "mma" },
    },
    {
      path: "/mma",
      name: "mma",
      component: MMAPage,
    },
    {
      path: "/soccer",
      name: "soccer",
      component: SoccerPage,
    },
    {
      path: "/bets",
      name: "bets",
      component: BetsPage,
    },
    {
      path: "/wallet",
      name: "wallet",
      component: WalletPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/news",
      name: "news",
      component: NewsPage,
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.query.confirmationCode) {
    const modalStore = useModalStore()
    modalStore.modalNotificationContent = EmailConfirmSucces
    modalStore.isModalNotification = true
    
  }
  
  const privatPages = ["/profile", "/wallet", "/bets", "/news"];
  const authRequired = !privatPages.includes(to.path);

  if (!authRequired && !authStore.isAuth) {
    router.push({ name: "mma" });
    return;
  }
  // document.title = to.meta.title as string;
});

export default router;

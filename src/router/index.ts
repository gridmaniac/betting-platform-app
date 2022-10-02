import { createRouter, createWebHistory } from "vue-router";
// sports

import MMAPage from "../pages/sports/MMAPage.vue";
import SoccerPage from "../pages/sports/SoccerPage.vue";
import NFLPage from "../pages/sports/NFLPage.vue";
import NCAAPage from "../pages/sports/NCAAPage.vue";
// others
import HomePage from "../pages/HomePage.vue";
import BetsPage from "../pages/BetsPage.vue";
import WalletPage from "../pages/WalletPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ConnectPage from "../pages/ConnectPage.vue";
import NewsPage from "../pages/NewsPage.vue";
import PlayResponsiblePage from "../pages/PlayResponsiblePage.vue";
import KnowYourLimitsPage from "../pages/KnowYourLimitsPage.vue";
import HowToDepositTokens from "../pages/HowToDepositTokens.vue";
import HowToWithdrawTokens from "../pages/HowToWithdrawTokens.vue";
import HowToPlaceABet from "../pages/HowToPlaceABet.vue";
// admin
import AdminAssetsPage from "@/pages/Admin/AssetsPage.vue";
import AdminBalancesPage from "@/pages/Admin/BalancesPage.vue";
import AdminBetsPage from "@/pages/Admin/BetsPage.vue";
import AdminDepositsPage from "@/pages/Admin/DepositsPage.vue";
import AdminSettingsPage from "@/pages/Admin/SettingsPage.vue";
import AdminTransactionsPage from "@/pages/Admin/TransactionsPage.vue";
import AdminUsersPage from "@/pages/Admin/UsersPage.vue";

import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";

import {
  EmailConfirmSucces,
  EmailConfirmError,
} from "@/composables/ModalNotifications";

import { confirmEmail } from "@/http/userApi";

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
      meta: {
        sportType: "MMA",
      },
    },
    {
      path: "/nfl",
      name: "nfl",
      component: NFLPage,
      meta: {
        sportType: "NFL",
      },
    },
    {
      path: "/soccer",
      name: "soccer",
      component: SoccerPage,
      meta: {
        sportType: "Soccer",
      },
    },
    {
      path: "/ncaa",
      name: "ncaa",
      component: NCAAPage,
      meta: {
        sportType: "NCAA",
      },
    },
    {
      path: "/bet-responsible",
      name: "PlayResponsible",
      component: PlayResponsiblePage,
    },
    {
      path: "/know-your-limits",
      name: "KnowYourLimits",
      component: KnowYourLimitsPage,
    },
    {
      path: "/how-to-deposit-tokens",
      name: "HowToDepositTokens",
      component: HowToDepositTokens,
    },
    {
      path: "/how-to-withdraw-tokens",
      name: "HowToWithdrawTokens",
      component: HowToWithdrawTokens,
    },
    {
      path: "/how-to-place-a-bet",
      name: "HowToPlaceABet",
      component: HowToPlaceABet,
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
      path: "/connect/:payload",
      name: "connect",
      component: ConnectPage,
    },
    {
      path: "/news",
      name: "news",
      component: NewsPage,
    },
    {
      path: "/admin",
      name: "admin",
      children: [
        {
          path: "assets",
          name: "adminAssets",
          component: AdminAssetsPage,
        },
        {
          path: "balances",
          name: "adminBalances",
          component: AdminBalancesPage,
        },
        {
          path: "bets",
          name: "adminBets",
          component: AdminBetsPage,
        },
        {
          path: "deposits",
          name: "adminDeposits",
          component: AdminDepositsPage,
        },
        {
          path: "settings",
          name: "adminSettings",
          component: AdminSettingsPage,
        },
        {
          path: "transactions",
          name: "adminTransactions",
          component: AdminTransactionsPage,
        },
        {
          path: "users",
          name: "adminUsers",
          component: AdminUsersPage,
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  if (to.query.confirmationCode) {
    const modalStore = useModalStore();
    const code = to.query.confirmationCode.toString();
    const response = await confirmEmail(code);
    if (response) {
      modalStore.modalNotificationContent = EmailConfirmSucces;
      modalStore.isModalNotification = true;
      return;
    }
    modalStore.modalNotificationContent = EmailConfirmError;
    modalStore.isModalNotification = true;
  }

  const privatPages = ["/profile", "/wallet", "/bets", "/news"];
  const authRequired = !privatPages.includes(to.path);
  // if (to.fullPath === '/admin' && !authStore.isAdmin ) {
  //   router.push({ name: "profile" });
  // }
  if (!authRequired && !authStore.isAuth) {
    router.push({ name: "mma" });
    return;
  }
});

export default router;

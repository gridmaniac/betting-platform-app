// icons
import {
  UserCircleIcon,
  LightningBoltIcon,
  TableIcon,
  CreditCardIcon,
  RssIcon,
  CogIcon,
  UsersIcon,
  SwitchHorizontalIcon,
  TicketIcon,
  CollectionIcon,
  CashIcon,
} from "@heroicons/vue/outline";
import IconNCAA from "@/components/Atoms/Icon/IconNCAA.vue";
import IconSoccer from "@/components/Atoms/Icon/IconSoccer.vue";
import IconNFL from "@/components/Atoms/Icon/IconNFL.vue";

export const menu = [
  {
    name: "Sports",
    links: [
      { value: "mma", name: "MMA", icon: LightningBoltIcon, isAuth: false },
      { value: "soccer", name: "Soccer", icon: IconSoccer, isAuth: false },
      { value: "nfl", name: "NFL", icon: IconNFL, isAuth: false },
      { value: "ncaa", name: "NCAA", icon: IconNCAA, isAuth: false },
    ],
  },
  {
    name: "Tools",
    links: [
      { value: "bets", name: "My Bets", icon: TableIcon, isAuth: true },
      { value: "wallet", name: "Wallet", icon: CreditCardIcon, isAuth: true },
      { value: "profile", name: "Profile", icon: UserCircleIcon, isAuth: true },
    ],
  },
  {
    name: "Featured",
    links: [{ value: "news", name: "News", icon: RssIcon, isAuth: true }],
  },
];

export const adminMenu = [
  {
    name: "Admin",
    links: [
      { value: "adminSettings", name: "settings", icon: CogIcon, isAuth: true },
      {
        value: "adminAssets",
        name: "assets",
        icon: CollectionIcon,
        isAuth: true,
      },
      {
        value: "adminDeposits",
        name: "deposits",
        icon: CreditCardIcon,
        isAuth: true,
      },
      {
        value: "adminTransactions",
        name: "transactions",
        icon: SwitchHorizontalIcon,
        isAuth: true,
      },
      { value: "adminBets", name: "bets", icon: TicketIcon, isAuth: true },
      {
        value: "adminBalances",
        name: "balances",
        icon: CashIcon,
        isAuth: true,
      },
      { value: "adminUsers", name: "users", icon: UsersIcon, isAuth: true },
    ],
  },
];

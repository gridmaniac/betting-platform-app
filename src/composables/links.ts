// icons
import {
  UserCircleIcon,
  LightningBoltIcon,
  SupportIcon,
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
import NFL from "@/assets/NFL.svg"

export const menu = [
  {
    name: "Sports",
    links: [
      { value: "mma", name: "MMA", icon: LightningBoltIcon, isAuth: false },
      { value: "soccer", name: "Soccer", icon: SupportIcon, isAuth: false },
      { value: "nfl", name: "NFL", img: NFL, isAuth: false },
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

// icons
import {
  UserCircleIcon,
  LightningBoltIcon,
  SupportIcon,
  TableIcon,
  CreditCardIcon,
  RssIcon,
} from "@heroicons/vue/outline";

export const menu = [
  {
    name: "Sports",
    links: [
      { value: "mma", name: "MMA", icon: LightningBoltIcon, isAuth: false },
      { value: "soccer", name: "Soccer", icon: SupportIcon, isAuth: false },
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

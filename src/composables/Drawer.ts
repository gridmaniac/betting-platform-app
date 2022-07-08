// icons
import {
  UserCircleIcon,
  LightningBoltIcon,
  SupportIcon,
  TableIcon,
  CreditCardIcon,
  RssIcon,
} from "@heroicons/vue/outline";

export const links = [
  {
    name: "Sports",
    items: [
      { value: "mma", name: "MMA", icon: LightningBoltIcon },
      { value: "soccer", name: "Soccer", icon: SupportIcon },
    ],
  },
  {
    name: "Tools",
    items: [
      { value: "my-bets", name: "My Bets", icon: TableIcon },
      { value: "wallet", name: "Wallet", icon: CreditCardIcon },
      { value: "profile", name: "Profile", icon: UserCircleIcon },
    ],
  },
  // {
  //   name: "Featured",
  //   items: [{ value: "news", name: "News", icon: RssIcon }],
  // },
];
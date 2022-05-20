// icons
import { LightningBoltIcon } from "@heroicons/vue/outline";
import { TableIcon } from "@heroicons/vue/outline";
import { CreditCardIcon } from "@heroicons/vue/outline";
import { RssIcon } from "@heroicons/vue/outline";
import { UserCircleIcon } from "@heroicons/vue/outline";

export const authLinks = [
  {
    name: "Tools",
    items: [
      { value: "events", name: "Events", icon: LightningBoltIcon },
      { value: "my-bets", name: "My Bets", icon: TableIcon },
    ],
  },
  {
    name: "Featured",
    items: [{ value: "news", name: "News", icon: RssIcon }],
  },
  {
    name: "Profile",
    items: [
      { value: "profile", name: "Profile", icon: UserCircleIcon },
      { value: "wallet", name: "Wallet", icon: CreditCardIcon },
    ],
  },
];

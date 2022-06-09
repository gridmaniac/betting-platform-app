// icons
import { LightningBoltIcon } from "@heroicons/vue/outline";
import { SupportIcon } from "@heroicons/vue/outline";
import { TableIcon } from "@heroicons/vue/outline";
import { CreditCardIcon } from "@heroicons/vue/outline";
import { RssIcon } from "@heroicons/vue/outline";
import { UserCircleIcon } from "@heroicons/vue/outline";

export const authLinks = [
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
  {
    name: "Featured",
    items: [{ value: "news", name: "News", icon: RssIcon }],
  },
];
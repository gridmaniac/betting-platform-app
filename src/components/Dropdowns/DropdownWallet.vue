<script setup lang="ts">
// icons
import { CashIcon } from "@heroicons/vue/outline";
// store
import { useWalletStore } from "@/stores/walletStore";
const walletStore = useWalletStore();

defineProps({
  isGlass: {
    type: Boolean,
    defoult: false,
  },
});
</script>

<template>
  <div class="dropdown dropdown-end">
    <div
      tabindex="0"
      class="btn btn-ghost rounded-btn"
      :class="{ glass: isGlass }"
    >
      <component :is="CashIcon" class="block mr-1 w-6 h-6 stroke-current" />
      Connect Wallet
    </div>

    <ul
      tabindex="0"
      class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
    >
      <li>
        <a @click="walletStore.connectWallet()">
          <img
            class="mr-3"
            src="https://sportsbet.imgix.net/logos/metamask.svg?auto=compress%2Cformat&blur=200&px=16&ixlib=react-9.0.3"
            width="24"
            height="24"
          />
          Metamask
        </a>
      </li>
    </ul>
  </div>
</template>

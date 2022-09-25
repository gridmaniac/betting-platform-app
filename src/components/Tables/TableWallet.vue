<script setup lang="ts">
import TheTable from "@/components/TheTable.vue";
// icons
import { GlobeAltIcon } from "@heroicons/vue/outline";
import koa from "@/assets/koa.png";
import eth from "@/assets/eth.png";
// composables
import { walletCols } from "@/composables/walletState";
// store
import { useWalletStore } from "@/stores/walletStore";
import { balanceEthFormat, balanceTokenFormat } from "@/composables/functions";
const walletStore = useWalletStore();
</script>

<template>
  <TheTable :rows="walletStore.transactions" :cols="walletCols">
    <template #type="{ item }"
      ><span class="capitalize">{{ item.type }}</span></template
    >
    <template #amount="{ item }">
      <span class="flex items-center">
        <img
          v-if="walletStore.currentAsset === 'eth'"
          class="inline-block mr-2 h-4"
          :src="eth"
        />
        <img v-else class="inline-block mr-2 h-4" :src="koa" />
        {{
          walletStore.currentAsset === "eth"
            ? balanceEthFormat(item.amount)
            : balanceTokenFormat(item.amount)
        }}
      </span>
    </template>
    <template #txHash="{ item }">
      <div class="flex justify-center">
        <button
          class="relative btn btn-ghost btn-sm btn-square"
          :disabled="!item.txHash"
        >
          <a
            target="_blank"
            :href="'https://etherscan.io/tx/' + item.txHash"
            class="absolute w-full h-full flex items-center justify-center"
          >
            <component
              :is="GlobeAltIcon"
              class="inline-block w-4 h-4 stroke-current"
            ></component>
          </a>
        </button>
      </div>
    </template>
  </TheTable>
</template>

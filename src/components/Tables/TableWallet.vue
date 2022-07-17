<script setup lang="ts">
import TheTable from "@/components/TheTable.vue";
// icons
import { GlobeAltIcon } from "@heroicons/vue/outline";
import coin from "@/assets/koa-token.png";
// composables
import { walletCols } from "@/composables/walletState";
// store
import { useWalletStore } from "@/stores/walletStore";
import { balanceFormat } from "@/composables/functions";
const walletStore = useWalletStore();
</script>

<template>
  <TheTable :rows="walletStore.transactions" :cols="walletCols">
    <template #type="{ item }"
      ><span class="capitalize">{{ item.type }}</span></template
    >
    <template #amount="{ item }">
      <img class="inline-block mr-2 h-4" :src="coin" />
      {{ balanceFormat(item.amount) }}
    </template>
    <template #txHash="{ item }">
      <div class="flex justify-center">
        <button class="btn btn-ghost btn-sm" :disabled="!item.txHash">
          <a target="_blank" :href="'https://etherscan.io/tx/' + item.txHash">
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

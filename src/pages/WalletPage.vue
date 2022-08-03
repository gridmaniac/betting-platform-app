<script setup lang="ts">
import { onMounted } from "vue";
// composables
import { balanceFormat } from "@/composables/functions";
import { TitleWallet } from "@/composables/titlesState";
// components
import TableWallet from "@/components/Tables/TableWallet.vue";
import DropdownWallet from "@/components/Dropdowns/DropdownWallet.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import TheTitle from "@/components/TheTitle.vue";
import FormWallet from "@/components/Forms/FormWallet.vue";
// store
import { useWalletStore } from "@/stores/walletStore";
const walletStore = useWalletStore();

onMounted(() => {
  document.querySelector("main")?.scrollTo(0, 0);
});
</script>

<template>
  <TheTitle :title="TitleWallet" />
  <div class="my-6" v-if="walletStore.isWalletPage">
    <div class="flex flex-col lg:flex-row w-full">
      <div
        class="relative card shadow-lg compact side bg-base-100 p-3 mb-6 lg:mb-0 mr-0 lg:mr-6 flex-1"
      >
        <div
          class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
          v-if="!walletStore.address"
        >
          <DropdownWallet :is-glass="true" />
        </div>
        <div :class="{ 'blur-md': !walletStore.address }">
          <FormWallet />
        </div>
      </div>
      <div class="shadow stats stats-vertical" style="min-width: 300px">
        <div class="stat">
          <div class="stat-title">Balance</div>
          <div class="stat-value">
            {{ balanceFormat(walletStore.balance) }}
            <span class="text-primary">KOA</span>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">In Bets</div>
          <div class="stat-value">
            {{ balanceFormat(walletStore.inBets) }}
            <span class="text-primary">KOA</span>
          </div>
          <!-- <div class="stat-desc">Potential win: {{ potentialWin }} KOA</div> -->
        </div>
      </div>
    </div>
    <div class="card shadow-lg compact side bg-base-100 p-3 my-6 w-full">
      <div class="flex flex-col justify-between items-center">
        <TableWallet />
        <div
          class="flex items-center justify-center w-full h-32"
          v-if="!walletStore.transactions.length"
        >
          <p>No transactions.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mt-10 relative w-full">
    <TheSpinner />
  </div>
</template>

<style scoped lang="scss">
.forAddress {
  overflow: hidden;
  p {
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
  }
}
</style>

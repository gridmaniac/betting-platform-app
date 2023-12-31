<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { DocumentDuplicateIcon } from "@heroicons/vue/outline";
import { ethers } from "ethers";
// composables
import { balanceEthFormat, balanceTokenFormat } from "@/composables/functions";
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
walletStore.getWallet(false);

onMounted(() => {
  document.querySelector("main")?.scrollTo(0, 0);
});

const currentAsset = computed({
  get: () => walletStore.currentAsset,
  set: (value) => {
    walletStore.setAsset(value);
  },
});

let timeout: NodeJS.Timeout;
const tooltipText = ref("Copy Balance");
const copyValue = async (value: string) => {
  clearTimeout(timeout);
  await navigator.clipboard.writeText(value);
  tooltipText.value = "Copied";
  timeout = setTimeout(() => {
    tooltipText.value = "Copy Balance";
  }, 3000);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <TheTitle :title="TitleWallet">
      <template #control-right>
        <select
          class="select select-bordered select-sm max-w-xs ml-6 uppercase"
          v-model="currentAsset"
        >
          <option v-for="asset in walletStore.assets" :key="asset.code">
            {{ asset.code }}
          </option>
        </select>
      </template>
    </TheTitle>
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
        <div class="shadow stats stats-vertical" style="min-width: 350px">
          <div class="stat">
            <div class="stat-title flex items-center gap-1">
              Balance
              <div class="tooltip tooltip-right ml-1" :data-tip="tooltipText">
                <button
                  class="btn btn-xs btn-sqr"
                  @click="copyValue(walletStore.balance)"
                >
                  <component :is="DocumentDuplicateIcon" class="w-4" />
                </button>
              </div>
            </div>
            <div class="stat-value overflow-hidden flex gap-1">
              <span class="truncate" :title="walletStore.balance">
                {{
                  walletStore.currentAsset === "eth"
                    ? balanceEthFormat(walletStore.balance)
                    : balanceTokenFormat(walletStore.balance)
                }}
              </span>
              <span class="text-primary uppercase">
                {{ walletStore.currentAsset }}
              </span>
            </div>
            <div class="stat-desc" v-if="currentAsset !== 'eth'">
              In Bets: {{ balanceTokenFormat(walletStore.inBets) }}
              <span class="text-primary uppercase">{{
                walletStore.currentAsset
              }}</span>
            </div>
          </div>
          <div class="stat" v-if="currentAsset !== 'eth'">
            <div class="stat-title">
              <div class="flex items-center">
                Gas Balance
                <div
                  class="tooltip ml-1"
                  data-tip="Used for outbound transacitons."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-primary"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="stat-value flex gap-1" style="max-width: 350px">
              <span
                class="truncate"
                :title="ethers.utils.formatUnits(walletStore.ethBalance)"
              >
                {{
                  balanceEthFormat(
                    ethers.utils.formatUnits(walletStore.ethBalance)
                  )
                }}
              </span>
              <span class="text-primary">ETH</span>
            </div>
          </div>
          <div class="stat" v-if="currentAsset === 'eth'">
            <div class="alert shadow-lg" style="max-width: 350px">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path></svg
                ><span
                  >Ethereum is used for paying gas fees when making
                  withdrawals.</span
                >
              </div>
            </div>
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
    <div v-else class="flex items-center mt-10 relative flex-1">
      <TheSpinner />
    </div>
  </div>
</template>

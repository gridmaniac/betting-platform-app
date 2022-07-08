<script setup lang="ts">
import { CreditCardIcon } from "@heroicons/vue/outline";
import { GlobeAltIcon } from "@heroicons/vue/outline";
import { inject, onMounted, ref } from "vue";
import coin from "../assets/koa-token.png";
import { balanceFormat } from "@/composables/Bets";
//store
import { useWalletStore } from "@/stores/walletStore";
import { useAuthStore } from "@/stores/authStore";
const walletStore = useWalletStore();
const authStore = useAuthStore();
// variables
const deposit = ref();
const withdrawValue = ref();
const potentialWin = ref(0);

onMounted(() => {
  document.querySelector("main")?.scrollTo(0, 0);
});
const { isModalAuthVisible } = inject<any>("auth");

const setMoney = (money: number) => {
  deposit.value = money;
};
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="CreditCardIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">Wallet</h1>
      </div>
    </div>
  </div>
  <div class="relative my-6">
    <div
      class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
      v-if="!authStore.isAuth"
    >
      <button
        class="btn btn-warning modal-button"
        @click="isModalAuthVisible = true"
      >
        login
      </button>
    </div>
    <div :class="{ 'blur-md': !authStore.isAuth }">
      <div class="flex flex-col w-full">
        <div
          class="relative card shadow-lg compact side bg-base-100 p-3 mb-6 mr-0 flex-1"
        >
          <div
            class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
            v-if="!walletStore.address"
          >
            <button
              class="btn btn-warning modal-button z-100"
              @click="walletStore.connectWallet"
            >
              Connect to wallet
            </button>
          </div>
          <div :class="{ 'blur-md': !walletStore.address }">
            <div class="flex justify-between">
              <div>
                <span class="font-bold">Connected:</span>
                <p class="text-primary">
                  {{ walletStore.address }}
                </p>
              </div>
              <button class="btn btn-outline" @click="walletStore.disconnectWallet">
                disconnect
              </button>
            </div>
            <div class="form-control mt-3">
              <div class="input-group">
                <button
                  class="btn btn-ghost btn-lg hidden sm:block"
                  @click="setMoney(100000)"
                >
                  100K
                </button>
                <button
                  class="btn btn-ghost btn-lg hidden sm:block"
                  @click="setMoney(1000000)"
                >
                  1M
                </button>
                <input
                  type="number"
                  placeholder="0.000000"
                  v-model="deposit"
                  class="input input-bordered input-md sm:input-lg flex-1 text-right"
                />
                <button
                  class="btn btn-outline btn-md sm:btn-lg w-auto sm:w-56"
                  @click="walletStore.createDeposit(deposit)"
                  :disabled="!deposit"
                >
                  Deposit
                </button>
              </div>
            </div>
            <div class="form-control mt-3">
              <div class="input-group">
                <input
                  type="number"
                  placeholder="0.000000"
                  v-model="withdrawValue"
                  class="input input-bordered flex-1 text-right"
                />
                <button
                  class="btn btn-outline w-auto sm:w-56"
                  :disabled="!withdrawValue"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow stats stats-vertical">
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
              {{ walletStore.inBets }}
              <span class="text-primary">KOA</span>
            </div>
            <div class="stat-desc">Potential win: {{ potentialWin }} KOA</div>
          </div>
        </div>
      </div>
      <div class="card shadow-lg compact side bg-base-100 p-3 my-6 w-full">
        <div class="flex justify-between items-center">
          <div class="overflow-x-auto w-full">
            <table class="table table-zebra table-compact w-full">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th align="center">Tx</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="transaction in walletStore.transactions"
                  :key="transaction.date"
                >
                  <td>{{ transaction.type }}</td>
                  <td>
                    <div class="flex items-center">
                      <img class="inline-block mr-2 h-4" :src="coin" />
                      {{ balanceFormat(transaction.amount) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div class="btn btn-ghost btn-sm">
                      <component
                        :is="GlobeAltIcon"
                        class="inline-block w-4 h-4 stroke-current"
                      ></component>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

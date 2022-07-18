<script setup lang="ts">
import { onMounted, ref } from "vue";
// composables
import { WithdrawMoney } from "@/composables/ModalNotifications";
import { balanceFormat } from "@/composables/functions";
// components
import TableWallet from "@/components/Tables/TableWallet.vue";
// store
import { useWalletStore } from "@/stores/walletStore";
import DropdownWallet from "@/components/Dropdowns/DropdownWallet.vue";
import TheSpinner from "../components/TheSpinner.vue";
import { useModalStore } from "@/stores/modalStore";
import TheTitle from "../components/TheTitle.vue";
import { TitleWallet } from "@/composables/titlesState";
const modalStore = useModalStore();
const walletStore = useWalletStore();
const isDisconnectRequest = ref(false);

onMounted(() => {
  document.querySelector("main")?.scrollTo(0, 0);
});

const setMoney = (money: number) => {
  walletStore.deposit = money;
};

const withdraw = () => {
  modalStore.modalNotificationContent = WithdrawMoney;
  modalStore.isModalWithdraw = true;
};

const disconnectUserWallet = async () => {
  isDisconnectRequest.value = true;
  const response = await walletStore.disconnectWallet();
  if (response) {
    isDisconnectRequest.value = false;
  }
};

const ceilDeposit = () => {
  if (walletStore.deposit) {
    walletStore.deposit = Math.floor(walletStore.deposit);
  }
};

const ceilWithdraw = () => {
  if (walletStore.withdrawAmount) {
    walletStore.withdrawAmount = Math.floor(walletStore.withdrawAmount);
  }
};
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
          <div class="flex flex-col sm:flex-row sm:justify-between">
            <div class="forAddress">
              <span class="font-bold">Connected:</span>
              <p class="text-primary">
                {{ walletStore.address }}
              </p>
            </div>
            <button
              class="btn btn-sm btn-outline ml-2 mt-2 sm:mt-0"
              :class="{ loading: isDisconnectRequest }"
              @click="disconnectUserWallet()"
              :disabled="isDisconnectRequest"
            >
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
                @blur="ceilDeposit()"
                placeholder="0"
                v-model="walletStore.deposit"
                class="input input-bordered input-md sm:input-lg flex-1 text-right"
              />
              <button
                class="btn btn-outline btn-md sm:btn-lg w-auto sm:w-56"
                @click="walletStore.createDeposit()"
                :disabled="!walletStore.deposit"
              >
                Deposit
              </button>
            </div>
          </div>
          <div class="form-control mt-3">
            <div class="input-group">
              <input
                type="number"
                placeholder="0"
                v-model="walletStore.withdrawAmount"
                class="input input-bordered flex-1 text-right"
                autocomplete="off"
                @blur="ceilWithdraw()"
              />
              <button
                class="btn btn-outline w-auto sm:w-56"
                :disabled="!walletStore.withdrawAmount"
                @click="withdraw()"
              >
                Withdraw
              </button>
            </div>
          </div>
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

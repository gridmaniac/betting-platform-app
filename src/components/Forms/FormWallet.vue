<script setup lang="ts">
//icon
import { LockClosedIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
// valid
import { useForm, useField } from "vee-validate";
// composables
import { WithdrawMoney } from "@/composables/ModalNotifications";
// store
import { useWalletStore } from "@/stores/walletStore";
import { useModalStore } from "@/stores/modalStore";
import { watch } from "vue";
const walletStore = useWalletStore();
const modalStore = useModalStore();

const isDepositRequest = ref(false);

const setMoney = (money: string) => {
  deposit.value = money;
};

//valid
const validationSchema = {
  deposit(value: string) {
    if (value != null && value.toLocaleString().length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
  withdraw(value: string) {
    if (value != null && value.toLocaleString().length >= 50) {
      return "Limit exceeded";
    }
    return true;
  },
};

useForm({ validationSchema });

const { value: deposit, errorMessage: depositError } = useField<string | null>(
  "deposit"
);
const { value: withdraw, errorMessage: withdrawError } = useField<
  string | null
>("withdraw");

const createDeposit = async () => {
  if (deposit.value) {
    isDepositRequest.value = true;
    await walletStore.deposit(deposit.value.toString());
    isDepositRequest.value = false;
    deposit.value = null;
  }
};

const createWithdraw = () => {
  if (withdraw.value) {
    walletStore.withdrawAmount = withdraw.value.toString();
    modalStore.modalNotificationContent = WithdrawMoney;
    modalStore.isModalWithdraw = true;
  }
};

watch(modalStore, () => {
  if (!modalStore.isModalWithdraw) {
    withdraw.value = null;
  }
});
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:justify-between">
    <div>
      <span class="font-bold">Connected:</span>
      <div class="flex items-center">
        <div class="flex-1 truncate text-primary">
          <span class="text-primary text-xs md:text-base">
            {{ walletStore.address }}
          </span>
        </div>
        <div
          v-if="walletStore.isDisconnectLocked"
          class="tooltip"
          data-tip="Temporarily locked."
        >
          <button
            class="btn btn-xs btn-ghost ml-1 gap-2"
            @click="modalStore.isModalConfirm = true"
            disabled
          >
            <component
              :is="LockClosedIcon"
              class="inline-block w-4 h-4 stroke-cur rent"
            />
            Disconnect
          </button>
        </div>
        <button
          v-else
          class="btn btn-xs btn-ghost ml-1"
          @click="modalStore.isModalConfirm = true"
        >
          Disconnect
        </button>
      </div>
    </div>
    <button
      v-if="walletStore.currentAsset !== 'eth'"
      class="btn btn-sm btn-outline btn-info mt-2 sm:mt-0"
      @click="walletStore.setAsset('eth')"
    >
      <img class="mr-1 h-4" src="@/assets/eth.png" />
      Add Gas
    </button>
  </div>
  <div class="form-control mt-3">
    <div class="input-group">
      <button
        class="btn btn-ghost btn-lg hidden sm:block"
        @click="
          walletStore.currentAsset === 'eth'
            ? setMoney('0.005')
            : setMoney('100000')
        "
      >
        {{ walletStore.currentAsset === "eth" ? "0.005" : "100K" }}
      </button>
      <button
        class="btn btn-ghost btn-lg hidden sm:block"
        @click="
          walletStore.currentAsset === 'eth'
            ? setMoney('0.01')
            : setMoney('1000000')
        "
      >
        {{ walletStore.currentAsset === "eth" ? "0.01" : "1M" }}
      </button>
      <input
        type="number"
        placeholder="0"
        v-model="deposit"
        class="input input-bordered input-md sm:input-lg flex-1 text-right"
      />
      <button
        class="btn btn-outline btn-md sm:btn-lg w-32 sm:w-56"
        :class="{ loading: isDepositRequest }"
        :disabled="!deposit || !!depositError || isDepositRequest"
        @click="createDeposit()"
      >
        Deposit
      </button>
    </div>
    <label v-if="depositError" class="label flex justify-end">
      <span class="label-text">{{ depositError }}</span>
    </label>
  </div>
  <div class="form-control mt-3">
    <div class="input-group">
      <input
        type="number"
        placeholder="0"
        v-model="withdraw"
        class="input input-bordered flex-1 text-right"
        autocomplete="new-password"
      />
      <button
        class="btn btn-outline w-32 sm:w-56"
        :disabled="!withdraw || !!withdrawError"
        @click="createWithdraw()"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>

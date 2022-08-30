<script setup lang="ts">
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

const setMoney = (money: number) => {
  deposit.value = money;
};

//valid
const validationSchema = {
  deposit(value: number) {
    if (value != null && value >= 1_000_000_000_000_000_000) {
      return `Limit exceeded`;
    }
    return true;
  },
  withdraw(value: number) {
    if (value != null && value >= 1_000_000_000_000_000_000) {
      return "Limit exceeded";
    }
    return true;
  },
};

useForm({ validationSchema });

const { value: deposit, errorMessage: depositError } = useField<number | null>(
  "deposit"
);
const { value: withdraw, errorMessage: withdrawError } = useField<
  number | null
>("withdraw");

const createDeposit = async () => {
  if (deposit.value) {
    await walletStore.deposit(deposit.value);
    deposit.value = null;
  }
};

const createWithdraw = () => {
  if (withdraw.value) {
    walletStore.withdrawAmount = withdraw.value;
    modalStore.modalNotificationContent = WithdrawMoney;
    modalStore.isModalWithdraw = true;
    // TASK! подумать как удалить value после закрытия модалки
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
    <div class="forAddress">
      <span class="font-bold">Connected:</span>
      <p class="text-primary">
        {{ walletStore.address }}
      </p>
    </div>
    <button
      class="btn btn-sm btn-outline ml-2 mt-2 sm:mt-0"
      @click="modalStore.isModalConfirm = true"
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
        placeholder="0"
        v-model="deposit"
        class="input input-bordered input-md sm:input-lg flex-1 text-right"
      />
      <button
        class="btn btn-outline btn-md sm:btn-lg w-auto sm:w-56"
        :disabled="!deposit || !!depositError"
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
        class="btn btn-outline w-auto sm:w-56"
        :disabled="!withdraw"
        @click="createWithdraw()"
      >
        Withdraw
      </button>
    </div>
    <label v-if="withdrawError" class="label flex justify-end">
      <span class="label-text">{{ withdrawError }}</span>
    </label>
  </div>
</template>

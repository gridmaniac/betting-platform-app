<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import moment from "moment";
// composables
import { ToastBetSuccess } from "@/composables/toastNotification";
import { balanceFormat } from "@/composables/functions";
// api
import { setBet } from "@/http/walletApi";
// component
import CompetitorModal from "@/components/CompetitorModal.vue";
// type
import type { IUserBet } from "@/models/walletModels";
// store
import { useModalStore } from "@/stores/modalStore";
import { useWalletStore } from "@/stores/walletStore";
import { useToastStore } from "@/stores/toastStore";
import type { IToast } from "@/models/notificationModel";
const modalStore = useModalStore();
const walletStore = useWalletStore();
const toastStore = useToastStore();

const amount = ref();
const errors = ref<{ [key: string]: string }>({});
const isRequest = ref(false);
const amountInput = ref();

onMounted(() => {
  amountInput.value.focus();
});

const placeBet = async () => {
  const bet: IUserBet = {
    amount: (amount.value * 1000000000).toString(),
    winnerId: modalStore.ModalBetContent?.winner.id,
    eventId: modalStore.ModalBetContent?.event.id,
    type: "winner",
    code: walletStore.currentAsset,
  };
  isRequest.value = true;
  const response = await setBet(bet);
  isRequest.value = false;
  // check data
  if (!response.data) {
    errors.value = response.modelErrors;
    const notification: IToast = {
      id: 0,
      title: "",
      description: response.err,
      status: "error",
    };
    toastStore.push(notification);
    return;
  }
  if (response.data) {
    modalStore.isModalBetVisible = false;
    toastStore.push(ToastBetSuccess);
    await walletStore.getWallet(true);
  }
};

const ceilBet = () => {
  if (amount.value) {
    amount.value = Math.floor(amount.value);
  }
};

const currentAsset = computed({
  get: () => walletStore.currentAsset,
  set: (value) => walletStore.setAsset(value),
});
</script>

<template>
  <div class="flex items-start sm:items-center flex-col mb-6">
    <h2
      class="font-bold text-left sm:text-center mb-2 text-2xl text-primary justify-start sm:justify-center"
    >
      {{ modalStore.ModalBetContent!.season.name }}
    </h2>
    <p class="text-primary">
      {{
        moment(modalStore.ModalBetContent?.event.startTime).format(
          "D MMMM, YYYY h:mm a"
        )
      }}
    </p>
  </div>
  <div class="divider"></div>
  <div class="justify-between flex mb-6">
    <CompetitorModal
      :competitor="modalStore.ModalBetContent!.event.competitors[0]"
      side="left"
    />
    <CompetitorModal
      :competitor="modalStore.ModalBetContent!.event.competitors[1]"
      side="right"
    />
  </div>
  <div class="flex flex-col justify-between">
    <div class="flex flex-row mb-5 justify-end">
      <p class="text-base-content text-opacity-40 mr-2">Winner:</p>
      <p
        class="text-base-content text-bold flex justify-between items-center ml-0"
      >
        {{ modalStore.ModalBetContent!.winner.name }}
      </p>
    </div>
    <div class="form-control">
      <label class="input-group input-group-md justify-end">
        <input
          type="number"
          class="input input-bordered input-lg px-5"
          v-model="amount"
          ref="amountInput"
          placeholder="0"
          @blur="ceilBet"
        />
        <select
          class="select select-lg select-warning uppercase"
          v-model="currentAsset"
        >
          <option v-for="asset in walletStore.assets" :key="asset.code">
            {{ asset.code }}
          </option>
        </select>
      </label>
      <label class="label justify-end">
        <span class="label-text">
          <template v-if="walletStore.isWalletPage">
            Balance:
            <span class="font-bold uppercase">
              {{ balanceFormat(walletStore.balance) }}
              {{ walletStore.currentAsset }}
            </span>
          </template>
          <template v-else> Loading balance... </template>
        </span>
      </label>
    </div>
  </div>
  <div class="divider"></div>
  <div class="modal-action">
    <button
      class="btn btn-primary"
      :class="{ loading: isRequest }"
      @click="placeBet()"
      :disabled="!amount || isRequest || amount > 99999999999"
    >
      Place a bet
    </button>
    <button
      class="btn"
      @click="modalStore.isModalBetVisible = false"
      :disabled="isRequest"
    >
      Close
    </button>
  </div>
</template>

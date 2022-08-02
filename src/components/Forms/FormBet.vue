<script setup lang="ts">
import { ref, onMounted } from "vue";
import moment from "moment";
import token from "@/assets/koa-token.png";
import { ToastBetSuccess } from "@/composables/toastNotification";
// api
import { setBet } from "@/http/walletApi";
// component
import CompetitorModal from "@/components/CompetitorModal.vue";
// store
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import type { IUserBet } from "@/models/walletModels";
const modalStore = useModalStore();
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
    amount: amount.value,
    winnerId: modalStore.ModalBetContent?.winner.id,
    eventId: modalStore.ModalBetContent?.event.id,
    type: "winner",
  };
  isRequest.value = true;
  // const { data, modelErrors, err } = await setBet(bet);
  await setBet(bet);
  isRequest.value = false;
  // if (modelErrors) {
  //   errors.value = modelErrors;
  // }
  // if (err) {
  //   modalStore.isModalBetVisible = false;
  //   toastStore.push(ToastLimitedExceeded);
  //   return;
  // }
  // if (data) {
  // }
  modalStore.isModalBetVisible = false;
  toastStore.push(ToastBetSuccess);
};

const ceilBet = () => {
  if (amount.value) {
    amount.value = Math.floor(amount.value);
  }
};
</script>

<template>
  <div class="flex items-center flex-col mb-6">
    <h2
      class="font-bold text-center mb-2 text-2xl text-primary justify-start sm:justify-center"
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
  <div class="justify-between hidden sm:flex mb-6">
    <CompetitorModal
      :competitor="modalStore.ModalBetContent!.event.competitors[0]"
      side="left"
    />
    <CompetitorModal
      :competitor="modalStore.ModalBetContent!.event.competitors[1]"
      side="right"
    />
  </div>
  <div class="flex flex-col sm:flex-row justify-between">
    <div class="flex flex-row sm:flex-col mb-2 sm:mb-0">
      <p class="text-base-content text-opacity-40">Winner:</p>
      <p
        class="text-base-content text-bold flex justify-between items-center ml-2 sm:ml-0"
      >
        {{ modalStore.ModalBetContent!.winner.name }}
      </p>
    </div>
    <div class="form-control">
      <label class="input-group sm:justify-end"
        ><input
          type="number"
          class="input input-bordered input-lg w-full"
          v-model="amount"
          ref="amountInput"
          placeholder="0"
          @blur="ceilBet"
        />
        <span>
          <img class="flex-0 mr-1 h-5 w-5 w-full" :src="token" />
        </span>
      </label>
      <label class="label">
        <span class="label-text">{{ errors["amount"] }}</span>
      </label>
    </div>
  </div>
  <div class="divider"></div>
  <div class="modal-action">
    <button
      class="btn btn-primary"
      :class="{ loading: isRequest }"
      @click="placeBet()"
      :disabled="!amount || isRequest"
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

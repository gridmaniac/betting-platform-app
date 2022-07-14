<script setup lang="ts">
import { ref } from "vue";
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

const amount = ref(150000);
const errors = ref<{ [key: string]: string }>({});
const isBetInProcess = ref(false);

const placeBet = async () => {
  const bet: IUserBet = {
    amount: amount.value,
    winnerId: modalStore.ModalBetContent?.winner.id,
    eventId: modalStore.ModalBetContent?.event.id,
    type: "winner",
  };
  isBetInProcess.value = true;
  const { data, modelErrors } = await setBet(bet);
  isBetInProcess.value = false;
  if (modelErrors) {
    errors.value = modelErrors;
  }
  if (data) {
    modalStore.isModalBetVisible = false;
    toastStore.push(ToastBetSuccess);
  }
};
</script>

<template>
  <div class="flex items-center flex-col mb-6">
    <h2
      class="font-bold text-center mb-2 text-2xl text-primary justify-start sm:justify-center"
    >
      {{ modalStore.ModalBetContent!.event.id }}
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
  <div class="flex justify-between">
    <div class="flex flex-col">
      <p class="text-base-content text-opacity-40">Winner:</p>
      <p class="text-base-content text-bold flex justify-between items-center">
        {{ modalStore.ModalBetContent!.winner.name }}
      </p>
    </div>
    <div class="form-control">
      <label class="input-group input-group-md justify-end"
        ><input
          type="number"
          class="input input-bordered input-lg"
          v-model="amount"
        />
        <span>
          <img class="flex-0 mr-1 h-5" :src="token" />
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
      @click="placeBet()"
      :disabled="!amount || isBetInProcess"
    >
      Place a bet
    </button>
    <button
      class="btn"
      @click="modalStore.isModalBetVisible = false"
      :disabled="isBetInProcess"
    >
      Close
    </button>
  </div>
</template>
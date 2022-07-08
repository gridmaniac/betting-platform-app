<script setup lang="ts">
import { inject, ref } from "vue";
import moment from "moment";
import token from "@/assets/koa-token.png";
// components
import TheModal from "@/components/TheModal.vue";
import CompetitorModal from "../CompetitorModal.vue";
// store
import { useBetsStore } from "@/stores/betStore";
import type {IUserBet} from "@/models/wallet"
const betsStore = useBetsStore();
// modal bet
const { isModalBetVisible, winner, modalEvent, modalSeason } =
  inject<any>("modalBet");
// variables
const amount = ref(1500);
const errorMessage = ref("");

type TBetType = "winner"

const placeBet = async () => {
  const usersBet:IUserBet = {
    amount: amount.value,
    winnerId: winner.value.id,
    eventId: modalEvent.value.id,
    type: 'winner',
  }
  const response = await betsStore.createBet(usersBet);
  if (response.error) {
    errorMessage.value = response?.error;
    return
  }
  isModalBetVisible.value = false
};
const closeModal = () => {
  isModalBetVisible.value = false;
};
</script>

<template>
  <TheModal v-model="isModalBetVisible">
    <template v-if="isModalBetVisible">
      <div class="flex items-center flex-col mb-6">
        <h2
          class="font-bold text-center mb-2 text-2xl text-primary justify-start sm:justify-center"
        >
          {{ modalSeason.name }}
        </h2>
        <p class="text-primary">
          {{ moment(modalEvent.startTime).format("D MMMM, YYYY H:mm a") }}
        </p>
      </div>
      <div class="divider"></div>
      <div class="justify-between hidden sm:flex mb-6">
        <CompetitorModal :competitor="modalEvent.competitors[0]" side="left" />
        <CompetitorModal :competitor="modalEvent.competitors[1]" side="right" />
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <p class="text-base-content text-opacity-40">Winner:</p>
          <p
            class="text-base-content text-bold flex justify-between items-center"
          >
            {{ winner.name }}
          </p>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md justify-end"
            ><input
              type="number"
              class="input input-bordered input-lg"
              v-model="amount"
              @input="errorMessage = ''"
            />
            <span>
              <img class="flex-0 mr-1 h-5" :src="token" />
            </span>
          </label>
          <label class="label">
            <span class="label-text">{{ errorMessage }}</span>
          </label>
        </div>
      </div>
      <div class="divider"></div>
      <div class="modal-action">
        <button class="btn btn-primary" @click="placeBet()" :disabled="!amount">
          Place a bet
        </button>
        <button class="btn" @click="closeModal()">Close</button>
      </div>
    </template>
  </TheModal>
</template>

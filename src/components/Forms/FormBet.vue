<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ethers } from "ethers";
import moment from "moment";
// valid
import { useForm, useField } from "vee-validate";
// composables
import { ToastBetSuccess } from "@/composables/toastNotification";
import { balanceEthFormat, balanceTokenFormat } from "@/composables/functions";
// api
import { setBet } from "@/http/walletApi";
// component
import CompetitorModal from "@/components/CompetitorModal.vue";
// type
import type { IUserBet } from "@/models/walletModels";
//icon
import { LockClosedIcon } from "@heroicons/vue/outline";
// store
import { useModalStore } from "@/stores/modalStore";
import { useWalletStore } from "@/stores/walletStore";
import { useToastStore } from "@/stores/toastStore";
import type { IToast } from "@/models/notificationModel";

const modalStore = useModalStore();
const walletStore = useWalletStore();
const toastStore = useToastStore();

const errors = ref<{ [key: string]: string }>({});
const isRequest = ref(false);
const amountInput = ref();

//valid
const validationSchema = {
  amount(value: string) {
    if (value != null && value.toString().length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
};
useForm({ validationSchema });

const { value: amount, errorMessage: amountError } = useField<string>("amount");

onMounted(() => {
  amountInput.value.focus();
});

const placeBet = async () => {
  const bet: IUserBet = {
    amount: ethers.utils
      .parseUnits(amount.value.toString(), walletStore.decimals)
      .toString(),
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
          maxlength="20"
          oninput="this.value=this.value.slice(0,this.maxLength)"
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
              {{
                walletStore.currentAsset === "eth"
                  ? balanceEthFormat(walletStore.balance)
                  : balanceTokenFormat(walletStore.balance)
              }}
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
    <div
      class="tooltip"
      data-tip="Please use tokens when placing bets."
      v-if="walletStore.currentAsset === 'eth'"
    >
      <button class="btn btn-primary gap-2" disabled>
        <component
          :is="LockClosedIcon"
          class="inline-block w-6 h-6 stroke-current"
        />
        Place a bet
      </button>
    </div>
    <button
      v-else
      class="btn btn-primary"
      :class="{ loading: isRequest }"
      @click="placeBet()"
      :disabled="!amount || isRequest || !!amountError"
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

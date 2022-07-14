<script setup lang="ts">
import TheModal from "./TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import { useWalletStore } from "@/stores/walletStore";
const modalStore = useModalStore();
const walletStore = useWalletStore();
const closeModal = () => {
  modalStore.isModalWithdraw = false;
  walletStore.withdrawError = null;
};
</script>

<template>
  <TheModal v-model="modalStore.isModalWithdraw" @close-modal="closeModal()">
    <template v-if="modalStore.isModalWithdraw">
      <div class="flex flex-col items-center">
        <component
          :is="modalStore.modalNotificationContent?.icon"
          class="w-24"
        />
        <h2 class="text-center mt-4 text-2xl">
          {{ modalStore.modalNotificationContent?.title }}
        </h2>
      </div>
      <p class="text-center mt-2">
        {{ modalStore.modalNotificationContent?.description }}
      </p>
      <p class="text-error text-center mt-2">{{ walletStore.withdrawError }}</p>
      <div class="divider"></div>
      <div class="flex justify-between">
        <button
          class="btn btn-ghost"
          @click="modalStore.isModalWithdraw = false"
        >
          close
        </button>
        <button class="btn" @click="walletStore.withdraw()">confirm</button>
      </div>
    </template>
  </TheModal>
</template>

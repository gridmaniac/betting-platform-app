<script setup lang="ts">
import { ref } from "vue";
import { QuestionMarkCircleIcon } from "@heroicons/vue/outline";
// component
import TheModal from "./TheModal.vue";
// store
import { useModalStore } from "@/stores/modalStore";
import { useWalletStore } from "@/stores/walletStore";
const modalStore = useModalStore();
const walletStore = useWalletStore();
// vars
const isRequest = ref(false);
// funct
const closeModal = () => {
  modalStore.isModalConfirm = false;
};

const disconnect = async () => {
  isRequest.value = true;
  const response = await walletStore.disconnectWallet();
  if (response) {
    isRequest.value = false;
    modalStore.isModalConfirm = false;
  }
};
</script>

<template>
  <TheModal v-model="modalStore.isModalConfirm" @close-modal="closeModal()">
    <template v-if="modalStore.isModalConfirm">
      <div class="flex justify-center">
        <component
          :is="QuestionMarkCircleIcon"
          class="inline-block w-16 h-16 stroke-current"
        />
      </div>
      <h2 class="text-center mt-4 text-2xl">
        Please make sure all deposits corresponding to this wallet are already
        reflected in your balance.
      </h2>
      <div class="divider"></div>
      <div class="flex justify-between">
        <button
          class="btn btn-ghost"
          @click="modalStore.isModalConfirm = false"
          :disabled="isRequest"
        >
          Cancel
        </button>
        <button
          class="btn btn-outline"
          @click="disconnect()"
          :disabled="isRequest"
        >
          Disconnect
        </button>
      </div>
    </template>
  </TheModal>
</template>

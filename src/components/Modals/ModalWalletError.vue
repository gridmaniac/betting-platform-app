<script setup lang="ts">
import TheModal from "@/components/TheModal.vue";
// icon
import { ExclamationCircleIcon } from "@heroicons/vue/outline";
// store
import { useWalletStore } from "@/stores/walletStore";
const walletStore = useWalletStore();

const closeModal = () => {
  walletStore.isModalWalletError = false;
};
</script>

<template>
  <TheModal v-model="walletStore.isModalWalletError">
    <template v-if="walletStore.isModalWalletError">
      <div class="flex flex-col items-center">
        <component
          :is="ExclamationCircleIcon"
          class="w-24 h-24 stroke-primary"
        ></component>
        <h2 class="font-bold text-center mb-2 text-2xl text-primary">
          {{ walletStore.modalMessageError?.title }}
        </h2>
      </div>
      <p class="text-center">
        {{ walletStore.modalMessageError?.description }}
      </p>
      <div class="divider"></div>
      <div class="flex justify-center">
        <button class="btn" @click="closeModal">close</button>
      </div>
    </template>
  </TheModal>
</template>

<script setup lang="ts">
import TheModal from "@/components/TheModal.vue";
// icon
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/vue/outline";
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
        <template v-if="walletStore.modalMessageError?.title === 'Success'">
          <component
          :is="CheckCircleIcon"
          class="w-24 h-24 stroke-primary"
        ></component>
        </template>
        <template v-else>
          <component
          :is="ExclamationCircleIcon"
          class="w-24 h-24 stroke-primary"
        ></component>
        </template>
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

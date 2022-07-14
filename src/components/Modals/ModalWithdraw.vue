<script setup lang="ts">
import { ref } from "vue";
// component
import TheModal from "./TheModal.vue";
//composables
import { ToastWithdrawSuccess } from "@/composables/toastNotification"
// model
import type { IToast } from "@/models/notificationModel";
// store
import { useModalStore } from "@/stores/modalStore";
import { useWalletStore } from "@/stores/walletStore";
import { useToastStore } from "@/stores/toastStore";
const modalStore = useModalStore();
const walletStore = useWalletStore();
const toastStore = useToastStore();

const isRequest = ref(false)

const closeModal = () => {
  modalStore.isModalWithdraw = false;
};

const handleSubmit = async () => {
  isRequest.value = true
  const { data, err} = await walletStore.withdraw()
  isRequest.value = false
  if (err) {
    modalStore.isModalWithdraw = false
    const toast:IToast = {
      id: 0,
      title: "",
      description: err,
      status: "error"
    }
    toastStore.push(toast)
  }
  if (data) {
    walletStore.withdrawAmount = null
    modalStore.isModalWithdraw = false
    const toast:IToast = ToastWithdrawSuccess
    toastStore.push(toast)
  }
}
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
      <div class="divider"></div>
      <div class="flex justify-between">
        <button
          class="btn btn-ghost"
          @click="modalStore.isModalWithdraw = false"
          :disabled="isRequest"
        >
          close
        </button>
        <button class="btn" :class="{'loading' : isRequest}" @click="handleSubmit()" :disabled="isRequest">confirm</button>
      </div>
    </template>
  </TheModal>
</template>

<script setup lang="ts">
import TheModal from "./TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
const modalStore = useModalStore();
</script>

<template>
  <TheModal
    v-model="modalStore.isModalNotification"
    @close-modal="modalStore.isModalNotification = false"
  >
    <template v-if="modalStore.isModalNotification">
      <div class="flex flex-col items-center">
        <component
          :is="modalStore.modalNotificationContent?.icon"
          class="w-24"
        />
        <h2 class="text-center mt-4 text-2xl">
          {{ modalStore.modalNotificationContent?.title }}
        </h2>
      </div>
      <p class="text-center mt-2" v-html="modalStore.modalNotificationContent?.description"></p>
      <div class="divider"></div>
      <div class="flex justify-end">
        <button class="btn" @click="modalStore.isModalNotification = false">
          close
        </button>
      </div>
    </template>
  </TheModal>
</template>

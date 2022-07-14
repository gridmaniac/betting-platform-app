<script setup lang="ts">
import TheModal from "./TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import FormBet from "../Forms/FormBet.vue";
const modalStore = useModalStore();
</script>

<template>
  <TheModal
    v-model="modalStore.isModalBetVisible"
    @close-modal="modalStore.isModalBetVisible = false"
  >
    <FormBet v-if="modalStore.isModalBetVisible" />
  </TheModal>
</template>

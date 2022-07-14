<script setup lang="ts">
import TheModal from "./TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import FormResetPassword from "@/components/Forms/FormResetPassword.vue";
const modalStore = useModalStore();
</script>

<template>
  <TheModal
    v-model="modalStore.isModalResetPassword"
    @close-modal="modalStore.isModalResetPassword = false"
  >
    <FormResetPassword />
  </TheModal>
</template>

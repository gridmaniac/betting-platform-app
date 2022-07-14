<script setup lang="ts">
import TheModal from "./TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import FormLogin from "@/components/Forms/FormLogin.vue";
import FormRegister from "@/components/Forms/FormRegister.vue";
const modalStore = useModalStore();
</script>

<template>
  <TheModal
    v-model="modalStore.isModalAuthVisible"
    @close-modal="modalStore.isModalAuthVisible = false"
  >
    <component :is="modalStore.isLogin ? FormLogin : FormRegister" v-if="modalStore.isModalAuthVisible"/>
  </TheModal>
</template>

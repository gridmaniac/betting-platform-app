<script setup lang="ts">
import ModalAuth from "./ModalAuth.vue";
import ModalResetPassword from "./ModalResetPassword.vue";
import ModalNotification from "./ModalNotification.vue";
import ModalWithdraw from "./ModalWithdraw.vue";
import ModalBet from "./ModalBet.vue";
import ModalConfirm from "./ModalConfirm.vue";
</script>

<template>
  <Teleport to="body">
    <ModalAuth />
    <ModalResetPassword />
    <ModalNotification />
    <ModalWithdraw />
    <ModalBet />
    <ModalConfirm />
  </Teleport>
</template>

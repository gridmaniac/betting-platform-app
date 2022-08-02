<script setup lang="ts">
// store
import { useToastStore } from "@/stores/toastStore";
import ToastItem from "./ToastItem.vue";
const toastStore = useToastStore();
</script>

<template>
  <div class="absolute text-white z-50 bottom-5 right-5">
    <TransitionGroup name="toast">
      <ToastItem
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :toast="toast"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.toast {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>

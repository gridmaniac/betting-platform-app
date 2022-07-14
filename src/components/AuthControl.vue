<script setup lang="ts">
import DropdownUser from "@/components/Dropdowns/DropdownUser.vue";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
const authStore = useAuthStore();
const modalStore = useModalStore();
</script>

<template>
  <DropdownUser v-if="authStore.isAuth" class="hidden lg:block" />
  <div v-else class="flex justify-center">
    <button
      class="btn btn-ghost mr-2"
      @click="
        (modalStore.isModalAuthVisible = true), (modalStore.isLogin = false)
      "
    >
      Create account
    </button>
    <button
      class="btn btn-outline"
      @click="
        (modalStore.isModalAuthVisible = true), (modalStore.isLogin = true)
      "
    >
      Login
    </button>
  </div>
</template>

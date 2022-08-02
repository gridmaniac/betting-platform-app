<script setup lang="ts">
import DropdownUser from "@/components/Dropdowns/DropdownUser.vue";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
const authStore = useAuthStore();
const modalStore = useModalStore();

const emit = defineEmits(["closeDrawer"]);

const register = () => {
  modalStore.isModalAuthVisible = true;
  modalStore.isLogin = false;
  emit("closeDrawer");
};

const login = () => {
  modalStore.isModalAuthVisible = true;
  modalStore.isLogin = true;
  emit("closeDrawer");
};
</script>

<template>
  <DropdownUser v-if="authStore.isAuth" class="hidden lg:block" />
  <div v-else class="flex justify-center">
    <button class="btn btn-ghost mr-2" @click="register()">
      Create account
    </button>
    <button class="btn btn-outline" @click="login()">Login</button>
  </div>
</template>

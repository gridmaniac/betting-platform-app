<script setup lang="ts">
import { useRouter } from "vue-router";
// assets
import token from "@/assets/koa-token.png";
// components
import TheLogo from "./TheLogo.vue";
import AuthControl from "./AuthControl.vue";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
const authStore = useAuthStore();
const modalStore = useModalStore();

const router = useRouter();

const handleSubmit = () => {
  console.log(authStore.isAuth);
  // authStore.isAuth ? "" :
  if (!authStore.isAuth) {
    modalStore.isModalAuthVisible = true;
    return;
  }
  router.push({ name: "wallet" });
};
</script>

<template>
  <div
    class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sticky top-0 z-50"
  >
    <TheLogo class="lg:hidden" />
    <div class="flex-1 px-2 hidden lg:inline-block">
      <button
        class="btn btn-sm btn-success btn-outline"
        @click="handleSubmit()"
      >
        <img class="flex-0 mr-1 h-4" :src="token" />DEPOSIT
      </button>
    </div>
    <div class="flex-none hidden px-2 lg:flex">
      <div class="flex items-stretch">
        <AuthControl />
      </div>
    </div>
    <div class="flex-none">
      <label class="btn btn-square btn-ghost lg:hidden" for="my-drawer-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current drawer-button"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
  </div>
</template>

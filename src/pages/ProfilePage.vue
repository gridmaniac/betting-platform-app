<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/outline";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";
import FormChangePassword from "../components/Forms/FormChangePassword.vue";
const authStore = useAuthStore();

const signout = () => {
  authStore.logout();
  router.push({ name: "mma" });
};
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="UserCircleIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">Profile</h1>
      </div>
    </div>
  </div>
  <div class="relative my-6">
    <div>
      <div class="card shadow-lg compact side bg-base-100 p-3 w-full">
        <FormChangePassword />
      </div>
      <div class="card shadow-lg compact side bg-base-100 p-3 my-6 w-full">
        <div>
          <button class="btn btn-outline" @click="signout()">log out</button>
        </div>
      </div>
    </div>
  </div>
</template>

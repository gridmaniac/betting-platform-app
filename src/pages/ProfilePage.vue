<script setup lang="ts">
import { inject } from "vue";
import { UserCircleIcon } from "@heroicons/vue/outline";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const auth = inject<any>("auth");

const connectToAccount = () => {
  auth.isModalAuthVisible.value = true
}
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
    <div
      class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
      v-if="!authStore.isAuth"
    >
      <button
        class="btn btn-warning modal-button"
        @click="connectToAccount()"
      >
        connect to account
      </button>
    </div>
    <div :class="{ 'blur-md': !authStore.isAuth }">
      <div class="card shadow-lg compact side bg-base-100 p-3 w-full">
        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Repeat password</span>
            </label>
            <input type="text" class="input input-bordered w-full max-w-xs" />
          </div>
          <button class="btn btn-outline mt-6">change password</button>
        </div>
      </div>
      <div
        class="card shadow-lg compact side bg-base-100 p-3 my-6 w-full"
        v-if="authStore.isAuth"
      >
        <div>
          <button class="btn btn-outline" @click="authStore.logout()">
            sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

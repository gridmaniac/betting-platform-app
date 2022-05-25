<script setup>
import { inject } from "vue";
import { UserCircleIcon } from "@heroicons/vue/outline";
const { isAuth, logout, isModalAuthVisible } = inject("auth");
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component :is="UserCircleIcon" class="inline-block w-6 h-6 mr-2 stroke-current" />
        <h1 class="font-bold text-2xl text-primary">Profile</h1>
      </div>
    </div>
  </div>
  <div class="relative max-w-6xl my-6 sm:m-6 mx-2">
    <div class="absolute inset-0 w-full h-full flex justify-center items-center z-50" v-if="!isAuth">
      <button class="btn btn-warning modal-button" @click="isLogin = true, isModalAuthVisible = true">
        connect to account
      </button>
    </div>
    <div :class="{ 'blur-md': !isAuth }">

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
          <button class="btn btn-warning mt-6">change password</button>
        </div>
      </div>
      <div class="card shadow-lg compact side bg-base-100 p-3 my-6 w-full" v-if="isAuth">
        <div>
          <button class="btn btn-warning" @click="logout">
            sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

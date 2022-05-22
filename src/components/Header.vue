<script setup>
import { inject } from "vue";
import token from "../assets/koa-token.png"
import Logo from "./Logo.vue"

import { useRouter } from "vue-router";
const router = useRouter()

const { isModalAuthVisible, isAuth, isLogin } = inject("auth")

const createAccount = () => {
  isLogin.value = false
  isModalAuthVisible.value = true
}

const loginAccount = () => {
  isLogin.value = true
  isModalAuthVisible.value = true
}
</script>

<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sticky top-0 z-50">
    <Logo class="flex lg:hidden "/>
    <div class="flex-1 px-2 mx-2 hidden lg:inline-block">
      <button class="btn btn-sm btn-success btn-outline" @click="router.push({ name: 'wallet'})">
        <img class="flex-0 mr-1 h-4" :src="token" />DEPOSIT
      </button>
    </div>
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div class="flex items-stretch">
        <div class="dropdown dropdown-end">
          <template v-if="!isAuth">
            <button class="btn btn-ghost modal-button mr-2" @click="createAccount">
              Create account
            </button>
            <button class="btn btn-warning modal-button" @click="loginAccount">
              Login
            </button>
          </template>
          <template v-else>
            <label for="modalAuth" class="btn btn-ghost modal-button mr-2" @click="$router.push({name: 'my-bets'})">
              place a bet
            </label>
          </template>
        </div>
      </div>
    </div>
    <div class="flex-none">
      <label class="btn btn-square btn-ghost lg:hidden" for="my-drawer-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current drawer-button">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
  </div>
</template>

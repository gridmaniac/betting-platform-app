<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
// icon
import { CashIcon } from "@heroicons/vue/outline";
// assets
import token from "../assets/koa-token.png";
// component
import TheLogo from "./TheLogo.vue";
// store
import { useAuthStore } from "@/stores/auth";
import { useWalletStore } from "@/stores/wallet";
const authStore = useAuthStore();
const walletStore = useWalletStore();
// variables
const router = useRouter();

const { isModalAuthVisible, isLogin } = inject<any>("auth");

const createAccount = () => {
  isLogin.value = false;
  isModalAuthVisible.value = true;
};

const loginAccount = () => {
  isLogin.value = true;
  isModalAuthVisible.value = true;
};
</script>

<template>
  <div
    class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sticky top-0 z-50"
  >
    <TheLogo class="flex lg:hidden" />
    <div class="flex-1 px-2 hidden lg:inline-block">
      <button
        class="btn btn-sm btn-success btn-outline"
        @click="router.push({ name: 'wallet' })"
      >
        <img class="flex-0 mr-1 h-4" :src="token" />DEPOSIT
      </button>
    </div>
    <div class="flex-none hidden px-2 lg:flex">
      <div class="flex items-stretch">
        <div v-if="walletStore.isConnected">
          <button class="btn" @click="router.push({ name: 'wallet' })">
            <component
              :is="CashIcon"
              class="block mr-2 w-6 h-6 stroke-current"
            />
            Deposit now
          </button>
        </div>
        <div v-else class="dropdown dropdown-end">
          <template v-if="authStore.isAuth">
            <div class="dropdown dropdown-end">
              <div tabindex="0" class="btn btn-ghost rounded-btn">
                <component
                  :is="CashIcon"
                  class="block mr-2 w-6 h-6 stroke-current"
                />
                Connect Wallet
              </div>
              <ul
                tabindex="0"
                class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a @click="walletStore.connectWallet">
                    <img
                      class="mr-3"
                      src="https://sportsbet.imgix.net/logos/metamask.svg?auto=compress%2Cformat&blur=200&px=16&ixlib=react-9.0.3"
                      width="24"
                      height="24"
                    />
                    Metamask
                  </a>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <button
              class="btn btn-ghost modal-button mr-2"
              @click="createAccount"
            >
              Create account
            </button>
            <button class="btn btn-outline modal-button" @click="loginAccount">
              Login
            </button>
          </template>
        </div>
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

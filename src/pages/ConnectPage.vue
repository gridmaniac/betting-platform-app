<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useWalletStore } from "@/stores/walletStore";
const authStore = useAuthStore()
const walletStore = useWalletStore()

const { params } = useRoute();
const router = useRouter();
const payload = atob(params.payload as string);
const userData = JSON.parse(payload);
authStore.token = userData.token
localStorage.setItem('token', authStore.token)
authStore.isAuth = true
walletStore.currentAsset = userData.code
router.push({ name: 'wallet'})
walletStore.connectWallet()
</script>

<template>
  <h1 class="text-3xl">BOBKA</h1>
</template>

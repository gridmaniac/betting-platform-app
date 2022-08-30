<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useWalletStore } from "@/stores/walletStore";
const authStore = useAuthStore();
const walletStore = useWalletStore();

async function connect() {
  const { params } = useRoute();
  const router = useRouter();
  const payload = atob(params.payload as string);
  const userData = JSON.parse(payload);
  authStore.token = userData.token;
  localStorage.setItem("token", userData.token);
  authStore.isAuth = true;
  walletStore.currentAsset = userData.code;
  await walletStore.getWallet(true);
  if (userData.deposit) {
    walletStore.deposit(userData.deposit);
  } else {
    walletStore.connectWallet();
  }
  router.push({ name: "wallet" });
}
connect()
</script>

<template>
  <div></div>
</template>

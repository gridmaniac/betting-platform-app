<script setup lang="ts">
import { ref, provide } from "vue";
//component
import TheDrawer from "./components/TheDrawer.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import TheModal from "./components/TheModal.vue";
import RegisterForm from "./components/RegisterForm/RegisterForm.vue";
import RegisterSuccessForm from "./components/RegisterForm/RegisterFormSuccess.vue";
import LoginForm from "./components/LoginForm/LoginForm.vue";
import ModalWalletError from "./components/Modals/ModalWalletError.vue";
//bet
const isModalBetVisible = ref(false);
const isModalRegSuccessVisible = ref(false);
const currentBet = ref({});
const userBets = ref([]);
const userBetsStorage = localStorage.getItem("userBets")
userBets.value = userBetsStorage !== null ? JSON.parse(userBetsStorage) : [];
const emailSucces = ref("");

const isModalAuthVisible = ref<boolean>(false);
const drawer = ref<boolean>(false);
const isLogin = ref<boolean>(true);
const isWallet = ref(localStorage.getItem("isWallet"));

provide("bets", {
  currentBet,
  userBets,
  isModalBetVisible,
});

provide("auth", {
  drawer,
  emailSucces,
  isLogin,
  isWallet,
  isModalAuthVisible,
  isModalRegSuccessVisible,
});

const closeModalAuth = () => {
  isModalAuthVisible.value = false;
};
</script>

<template>
  <Teleport to="body">
    <ModalWalletError />
  </Teleport>
  <TheModal @closeModal="closeModalAuth" v-model="isModalRegSuccessVisible">
    <component :is="RegisterSuccessForm"></component>
  </TheModal>
  <TheModal
    modalId="modalAuth"
    @closeModal="closeModalAuth"
    v-model="isModalAuthVisible"
  >
    <component
      :is="isLogin ? LoginForm : RegisterForm"
      v-if="isModalAuthVisible"
    ></component>
  </TheModal>
  <div class="bg-base-200 drawer drawer-mobile h-screen">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden flex flex-col">
      <TheHeader />
      <div class="flex-auto mx-2 sm:mx-6 max-w-6xl">
        <router-view></router-view>
      </div>
      <TheFooter />
    </main>
    <TheDrawer v-model="drawer" />
  </div>
</template>

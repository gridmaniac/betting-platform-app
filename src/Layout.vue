<script setup>
import { ref, provide } from "vue";
//component
import Drawer from "./components/Drawer.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import RegisterForm from "./components/RegisterForm/RegisterForm.vue";
import RegisterSuccessForm from "./components/RegisterForm/RegisterFormSuccess.vue";
import LoginForm from "./components/LoginForm/LoginForm.vue";
// http
import { useRouter } from "vue-router";

const router = useRouter();

//bet
const isModalBetVisible = ref(false);
const isModalRegSuccessVisible = ref(false);
const currentBet = ref({});
const userBets = ref([]);
userBets.value = JSON.parse(localStorage.getItem("userBets")) || [];
const emailSucces = ref("")

const isModalAuthVisible = ref(false);
const drawer = ref(false);
const isLogin = ref(true);
const isAuth = ref(localStorage.getItem("token"));
const isWallet = ref(localStorage.getItem("isWallet"));

const login = (token) => {
  localStorage.setItem("token", token);
  isAuth.value = true;
  isModalAuthVisible.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  isAuth.value = false;
  router.push({ name: "events" });
};

provide("bets", {
  currentBet,
  userBets,
  isModalBetVisible,
});

provide("auth", {
  emailSucces,
  login,
  logout,
  isLogin,
  isAuth,
  isWallet,
  isModalAuthVisible,
  isModalRegSuccessVisible,
});

const closeModalAuth = () => {
  isModalAuthVisible.value = false;
};
</script>

<template>
  <Modal
    v-if="isModalRegSuccessVisible"
    v-model="isModalRegSuccessVisible"
  >
    <component :is="RegisterSuccessForm"></component>
  </Modal>
  <Modal
    v-if="isModalAuthVisible"
    modalId="modalAuth"
    @closeModal="closeModalAuth"
    v-model="isModalAuthVisible"
  >
    <component :is="isLogin ? LoginForm : RegisterForm"></component>
  </Modal>
  <div class="bg-base-200 drawer drawer-mobile h-screen">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden flex flex-col">
      <Header />
      <div class="flex-auto">
        <router-view></router-view>
      </div>
      <Footer />
    </main>
    <Drawer @navigate="drawer = false" />
  </div>
</template>

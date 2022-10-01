<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
// components
import TheDrawer from "./components/TheDrawer.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import ModalList from "./components/Modals/ModalList.vue";
import ToastList from "./components/Toast/ToastList.vue";
import logo from "./assets/koa-logo.png";
// vars
const drawer = ref(false);
const isActive = !!import.meta.env.VITE_COMING_SOON;
</script>

<template>
  <div>
    <template v-if="!isActive">
      <ModalList />
      <div class="drawer drawer-mobile relative">
        <input
          id="my-drawer-2"
          type="checkbox"
          class="drawer-toggle"
          v-model="drawer"
        />
        <main
          class="drawer-content overflow-x-hidden flex flex-col bg-base-200"
        >
          <TheHeader />
          <div class="flex-auto mx-2 sm:mx-4 max-w-6xl mb-6">
            <RouterView />
          </div>
          <TheFooter class="max-w-6xl" />
        </main>
        <TheDrawer @navigate="drawer = false" />
        <ToastList class="toast-list" />
      </div>
    </template>
    <template v-else>
      <article
        class="bg-base-200 flex flex-col items-center justify-center w-full h-screen gap-12"
      >
        <img class="w-72 md:w-96" :src="logo" alt="koa-token" />
        <h1 class="text-4xl md:text-7xl font-bold uppercase">Coming Soon</h1>
      </article>
    </template>
  </div>
</template>

<style scoped lang="scss">
.toast-list {
  z-index: 9999;
}
</style>

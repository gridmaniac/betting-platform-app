<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
// components
import TheDrawer from "./components/TheDrawer.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import ModalList from "./components/Modals/ModalList.vue";
import ToastList from "./components/Toast/ToastList.vue";
// vars
const drawer = ref(false);
</script>

<template>
  <ModalList />
  <div class="drawer drawer-mobile relative">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden flex flex-col bg-base-200">
      <TheHeader />
      <div class="flex-auto mx-2 sm:mx-4 max-w-6xl mb-6">
        <RouterView />
      </div>
      <TheFooter class="max-w-6xl" />
    </main>
    <TheDrawer @navigate="drawer = false" />
    <ToastList />
  </div>
</template>

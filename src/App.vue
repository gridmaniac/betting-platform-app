<script setup lang="ts">
import { RouterView } from "vue-router";
import TheDrawer from "./components/TheDrawer.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import AllModals from "./components/Modals/AllModals.vue";
import { XIcon } from "@heroicons/vue/outline";

import { useToastStore } from "./stores/toastStore";
import { ref } from "vue";
const toastStore = useToastStore();

const drawer = ref(false);
</script>

<template>
  <AllModals />
  <div class="drawer drawer-mobile relative">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden flex flex-col bg-base-200">
      <!-- Page content here -->
      <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden"
        >Open drawer</label
      > -->
      <TheHeader />
      <div class="flex-auto mx-2 sm:mx-4 max-w-6xl">
        <RouterView />
      </div>
      <TheFooter class="max-w-6xl" />
    </main>
    <TheDrawer @navigate="drawer = false" />
    <div class="absolute text-white z-50 bottom-5 right-5">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="alert shadow-lg mt-2"
        :class="{
          'alert-error': toast.status === 'error',
          'alert-success': toast.status === 'success',
        }"
      >
        <div>
          <svg
            v-if="toast.status === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-if="toast.status === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ toast.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

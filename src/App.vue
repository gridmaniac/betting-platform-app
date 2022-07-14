<script setup lang="ts">
import { RouterView } from "vue-router";
import TheDrawer from "./components/TheDrawer.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import AllModals from "./components/Modals/AllModals.vue";
import { XIcon } from "@heroicons/vue/outline";

import { useToastStore } from "./stores/toastStore";
const toastStore = useToastStore();
</script>

<template>
  <AllModals />
  <div class="drawer drawer-mobile relative">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <main class="drawer-content overflow-x-hidden flex flex-col bg-base-200">
      <!-- Page content here -->
      <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden"
        >Open drawer</label
      > -->
      <TheHeader class="max-w-6xl" />
      <div class="flex-auto mx-2 sm:mx-4 max-w-6xl">
        <RouterView />
      </div>
      <TheFooter class="max-w-6xl" />
    </main>
    <TheDrawer />
    <div class="absolute text-white z-50 bottom-5 right-5">
      <div class="toast toast-end w-full max-w-md">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="alert relative"
          :class="{
            'alert-error': toast.status === 'error',
            'alert-success': toast.status === 'success',
          }"
        >
          <div class="flex flex-col">
            <h3 v-if="toast.title">{{ toast.title }}</h3>
            <span>{{ toast.description }}</span>
          </div>
          <button
            class="btn-ghost btn-xs absolute top-2 right-0"
            @click="toastStore.remove(toast)"
          >
            <component :is="XIcon" class="w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

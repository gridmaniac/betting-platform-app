<script setup>
import { ref } from "vue";
import Drawer from "./Drawer.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

const drawer = ref(false);
</script>

<template>
  <div class="bg-base-200 drawer drawer-mobile h-screen">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden">
      <Header />
      <router-view></router-view>
      <Footer />
    </main>
    <Drawer @navigate="drawer = false" />
  </div>
</template>

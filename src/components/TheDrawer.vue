<script setup lang="ts">
//composables
import { links } from "@/composables/Drawer";
import { inject } from "vue";
import TheLogo from "./TheLogo.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const { isModalAuthVisible, isLogin, drawer } = inject<any>("auth");

const createAccount = () => {
  isLogin.value = false;
  isModalAuthVisible.value = true;
  drawer.value = false;
};

const loginAccount = () => {
  isLogin.value = true;
  isModalAuthVisible.value = true;
  drawer.value = false;
};
</script>

<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <aside
      class="flex flex-col border-r border-base-200 bg-base-100 text-base-content w-80"
    >
      <TheLogo class="border-b border-base-200" />
      <div v-if="!authStore.isAuth" class="m-2 flex lg:hidden justify-center">
        <button class="btn btn-ghost modal-button mr-2" @click="createAccount">
          Create account
        </button>
        <button class="btn btn-outline modal-button" @click="loginAccount">
          Login
        </button>
      </div>
      <ul
        class="menu flex flex-col p-4 pt-2 compact"
        v-for="section in links"
        :key="section.name"
      >
        <li class="mt-4 menu-title">
          <span>
            {{ section.name }}
          </span>
        </li>
        <li v-for="link in section.items" :key="link.value">
          <router-link
            :to="{ name: link.value }"
            @click="drawer = false"
            class="capitalize"
          >
            <component
              :is="link.icon"
              class="inline-block w-6 h-6 mr-2 stroke-current"
            />
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Logo from "./Logo.vue"
//composables
import { authLinks } from "../composables/Drawer";
import { inject } from "vue";

const {isModalAuthVisible, isLogin} = inject("auth")

const emit = defineEmits(["navigate"]);
const navigate = () => {
  emit("navigate");
};

const createAccount = () => {
  isLogin.value = false
  isModalAuthVisible.value = true
}

const loginAccount = () => {
  isLogin.value = true
  isModalAuthVisible.value = true
}
</script>

<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <aside class="flex flex-col border-r border-base-200 bg-base-100 text-base-content w-80">
      <Logo  class="border-b border-base-200"/>

      <div class="flex-1">
        <ul class="menu flex flex-col p-4 pt-2 compact" v-for="section in authLinks">
          <li class="mt-4 menu-title">
            <span>
              {{ section.name }}
            </span>
          </li>
          <li v-for="link in section.items">
            <router-link :to="{ name: link.value }" @click="navigate" class="capitalize">
              <component :is="link.icon" class="inline-block w-6 h-6 mr-2 stroke-current" />
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="!isAuth" class="m-2 flex lg:hidden justify-center ">
        <button class="btn btn-ghost modal-button mr-2" @click="createAccount">
          Create account
        </button>
        <label for="modalAuth" class="btn btn-warning modal-button" @click="loginAccount">
          Login
        </label>
      </div>
    </aside>
  </div>
</template>

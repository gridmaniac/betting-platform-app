<script setup lang="ts">
import { nextTick } from "vue";
import { useRouter } from "vue-router";
// icons
import { UserCircleIcon } from "@heroicons/vue/outline";
// store
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
const authStore = useAuthStore();

const router = useRouter();

defineProps({
  isGlass: {
    type: Boolean,
    defoult: false,
  },
});

const logout = () => {
  authStore.logout();
  router.push({ name: "mma" });
};

const element = ref();
const unFocus = () => {
  nextTick(() => {
    element.value.focus();
    element.value.blur();
  });
};
</script>

<template>
  <div class="dropdown dropdown-end" ref="element" tabindex="0">
    <div
      tabindex="0"
      class="btn btn-ghost rounded-btn"
      :class="{ glass: isGlass }"
    >
      <component
        :is="UserCircleIcon"
        class="block mr-2 w-6 h-6 stroke-current"
      />
      {{ authStore.userEmail }}
    </div>

    <ul
      tabindex="0"
      class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
    >
      <li @click="unFocus()">
        <RouterLink :to="{ name: 'profile' }"> Profile </RouterLink>
      </li>
      <li @click="unFocus()">
        <RouterLink :to="{ name: 'wallet' }"> Wallet </RouterLink>
      </li>
      <li></li>
      <li @click="unFocus()">
        <p @click="logout()">Log out</p>
      </li>
    </ul>
  </div>
</template>

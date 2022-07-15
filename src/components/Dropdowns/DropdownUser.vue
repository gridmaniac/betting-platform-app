<script setup lang="ts">
import { useRouter } from "vue-router";
// icons
import { UserCircleIcon } from "@heroicons/vue/outline";
// store
import { useAuthStore } from "@/stores/authStore";
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
</script>

<template>
  <div class="dropdown dropdown-end">
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
      <li>
        <RouterLink :to="{ name: 'profile' }"> Profile </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'wallet' }"> Wallet </RouterLink>
      </li>
      <li></li>
      <li>
        <p @click="logout()">Log out</p>
      </li>
    </ul>
  </div>
</template>

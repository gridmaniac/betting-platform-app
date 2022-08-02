<script setup lang="ts">
import { useRouter } from "vue-router";
import { menu } from "@/composables/links";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import TheLogo from "./TheLogo.vue";
import AuthControl from "./AuthControl.vue";
const authStore = useAuthStore();
const modalStore = useModalStore();

const router = useRouter();

const emit = defineEmits(["navigate"]);

interface ILink {
  icon: any;
  isAuth: boolean;
  name: string;
  value: string;
}

const goToPage = (link: ILink) => {
  if (!link.isAuth) {
    router.push({ name: link.value });
    emit("navigate");
  }
  if (!authStore.isAuth && link.isAuth) {
    modalStore.isModalAuthVisible = true;
  }
  if (authStore.isAuth && link.isAuth) {
    router.push({ name: link.value });
    emit("navigate");
  }
};
</script>

<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <aside
      class="flex flex-col border-r border-base-200 bg-base-100 text-base-content w-80"
    >
      <TheLogo />
      <AuthControl class="lg:hidden" @close-drawer="$emit('navigate')" />
      <ul
        class="menu flex flex-col p-4 mb-2 compact"
        v-for="section in menu"
        :key="section.name"
      >
        <li class="menu-title">
          <span>
            {{ section.name }}
          </span>
        </li>
        <template v-for="link in section.links" :key="link.value">
          <li v-if="link.value === 'news'" class="disabled">
            <span>
              <component
                :is="link.icon"
                class="inline-block w-6 h-6 mr-2 stroke-current"
              />
              {{ link.name }}
            </span>
          </li>
          <li v-else :class="{ disabled: link.isAuth && !authStore.isAuth }">
            <a class="capitalize" @click="goToPage(link)">
              <component
                :is="link.icon"
                class="inline-block w-6 h-6 mr-2 stroke-current"
              />
              {{ link.name }}
            </a>
          </li>
        </template>
      </ul>
    </aside>
  </div>
</template>

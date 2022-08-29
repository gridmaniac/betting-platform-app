<script setup lang="ts">
import { useRoute } from "vue-router";
import { menu, adminMenu } from "@/composables/links";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import TheLogo from "./TheLogo.vue";
import AuthControl from "./AuthControl.vue";
const authStore = useAuthStore();
const modalStore = useModalStore();

const route = useRoute();

defineEmits(["navigate"]);

interface ILink {
  icon?: any;
  img?: any;
  isAuth: boolean;
  name: string;
  value: string;
}

const goToPage = (link: ILink) => {
  if (!authStore.isAuth && link.isAuth) {
    modalStore.isModalAuthVisible = true;
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
      <AuthControl class="lg:hidden mt-4" @close-drawer="$emit('navigate')" />
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
            <span class="flex items-center">
              <component
                :is="link.icon"
                class="inline-block w-6 h-6 mr-2 stroke-current fill-current"
              />
              {{ link.name }}
            </span>
          </li>
          <li v-else :class="{ disabled: link.isAuth && !authStore.isAuth }">
            <RouterLink
              :to="{ name: link.value }"
              class="capitalize"
              :class="{ active: route.name === link.value }"
              @click="goToPage(link)"
            >
              <component
                :is="link.icon"
                class="inline-block w-6 h-6 mr-2 stroke-current"
                svg-class="fill-current"
              />
              {{ link.name }}
            </RouterLink>
          </li>
        </template>
      </ul>
      <!-- admin menu -->
      <template v-if="authStore.isAdmin">
        <ul
          class="menu flex flex-col p-4 mb-2 compact"
          v-for="section in adminMenu"
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
              <RouterLink
                :to="{ name: link.value }"
                class="capitalize"
                :class="{ active: route.name === link.value }"
              >
                <component
                  :is="link.icon"
                  class="inline-block w-6 h-6 mr-2 stroke-current"
                />
                {{ link.name }}
              </RouterLink>
            </li>
          </template>
        </ul>
      </template>
    </aside>
  </div>
</template>

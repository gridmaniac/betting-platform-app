<script setup lang="ts">
import { footerMenu } from "@/composables/footer";
</script>

<template>
  <div class="max-w-7xl">
    <footer
      class="px-4 py-10 border-t footer bg-base-200 border-base-300 text-base-content"
    >
      <div>
        <div class="inline-block text-3xl font-title">
          <span class="text-primary font-bold">KOA</span
          ><span class="uppercase text-base-content font-bold">COMBAT</span>
        </div>
        <p class="opacity-50">Fighting for Change</p>
      </div>
      <div v-for="item in footerMenu" :key="item.name">
        <span class="footer-title">{{ item.name }}</span>
        <a
          v-for="link in item.links"
          :key="link.name"
          target="_blank"
          rel="noopener"
          :href="link.url"
          class="group link link-hover"
        >
          {{ link.name }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="hidden"
          >
            <path
              fill-rule="evenodd"
              d="M19,14 L19,19 C19,20.1045695 18.1045695,21 17,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L10,5 L10,7 L5,7 L5,19 L17,19 L17,14 L19,14 Z M18.9971001,6.41421356 L11.7042068,13.7071068 L10.2899933,12.2928932 L17.5828865,5 L12.9971001,5 L12.9971001,3 L20.9971001,3 L20.9971001,11 L18.9971001,11 L18.9971001,6.41421356 Z"
            ></path>
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>

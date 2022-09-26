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
          :target=" link.target ? '_blank' : ''"
          rel="noopener"
          :href="link.url"
          class="group link link-hover"
        >
          {{ link.name }}
        </a>
      </div>
    </footer>
  </div>
</template>

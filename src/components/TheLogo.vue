<script setup lang="ts">
import token from "../assets/koa.png";
</script>

<template>
  <div class="mx-auto navbar max-w-none border-b border-base-200">
    <div class="flex items-center flex-none">
      <a
        href="/"
        aria-label="Homepage"
        class="px-2 flex-0 btn btn-ghost nuxt-link-active mr-1"
        ><div
          class="inline-flex items-center text-lg font-title font-bold text-primary"
        >
          <img class="w-9 mr-2" :src="token" />
          <span>KOA</span
          ><span class="uppercase text-base-content">COMBAT</span>
        </div></a
      >
    </div>
    <a rel="nofollow" class="font-mono text-xs opacity-50"
      ><div>betting platform</div></a
    >
  </div>
</template>

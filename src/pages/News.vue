<script setup>
import { onMounted } from "vue";
import { RssIcon } from "@heroicons/vue/outline";
import News from "../components/News.vue";
import { news } from "../composables/news"

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="RssIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">News</h1>
      </div>
    </div>
  </div>
  <div
    class="m-6 mx-2 sm:mx-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 max-w-6xl"
  >
    <News v-for="(x, i) in news" :key="i" :image="x.imageUrl" />
  </div>
</template>

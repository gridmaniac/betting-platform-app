<script setup>
import { FireIcon } from "@heroicons/vue/outline";
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="FireIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">Fight</h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
//icon
import { LockClosedIcon } from "@heroicons/vue/outline";
import token from "../assets/koa-token.png";

defineProps({
  status: Boolean,
});
</script>

<template>
  <button class="btn btn-active">
    <component
      v-if="status"
      :is="LockClosedIcon"
      class="inline-block w-6 h-6 stroke-current"
    />
    <div v-else class="flex">
      <img class="h-4" :src="token" />
      <img class="h-4 -ml-2" :src="token" />
    </div>
  </button>
</template>

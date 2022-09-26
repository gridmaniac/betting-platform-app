<script setup lang="ts">
//icon
import { LockClosedIcon } from "@heroicons/vue/outline";
import token from "@/assets/koa.png";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greater("md");

defineProps({
  status: Boolean,
});
</script>

<template>
  <div>
    <div
      v-if="status"
      class="tooltip"
      :class="{ 'tooltip-left': !isDesktop }"
      data-tip="This event has passed the period."
    >
      <button class="btn btn-active" disabled>
        <component
          :is="LockClosedIcon"
          class="inline-block w-6 h-6 stroke-cur rent"
        />
      </button>
    </div>
    <button v-else class="btn btn-active">
      <div class="flex">
        <img class="h-4" :src="token" />
        <img class="h-4 -ml-2" :src="token" />
      </div>
    </button>
  </div>
</template>

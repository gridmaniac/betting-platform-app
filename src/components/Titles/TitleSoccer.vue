<script setup lang="ts">
import { ArrowCircleRightIcon, CheckCircleIcon } from "@heroicons/vue/outline";
// components
import TheTitle from "@/components/TheTitle.vue";
import { TitleSoccer } from "@/composables/titlesState";
defineProps({
  activeTab: Boolean,
});
defineEmits(["changeTab"]);
</script>

<template>
  <TheTitle :title="TitleSoccer">
    <template #control-center>
      <div class="tabs tabs-boxed">
        <a
          class="tab tab-sm"
          :class="{ 'tab-active': activeTab }"
          @click="$emit('changeTab', true)"
        >
          <span class="hidden md:block">Upcoming</span>
          <component
            :is="ArrowCircleRightIcon"
            class="block md:hidden w-6 h-6 stroke-current"
          />
        </a>
        <a
          class="tab tab-sm"
          :class="{ 'tab-active': !activeTab }"
          @click="$emit('changeTab', false)"
        >
          <span class="hidden md:block">Completed</span>
          <component
            :is="CheckCircleIcon"
            class="block md:hidden w-6 h-6 stroke-current"
          />
        </a>
      </div>
    </template>
    <template #control-right>
      <select
        class="select select-bordered select-sm max-w-xs ml-6"
        value="ALL"
      >
        <option>ALL</option>
      </select>
    </template>
  </TheTitle>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
//icon
import { SupportIcon } from "@heroicons/vue/outline";
import { ArrowCircleRightIcon } from "@heroicons/vue/outline";
import { CheckCircleIcon } from "@heroicons/vue/outline";
//components
import CollapseSoccer from "../components/CollapseSoccer.vue";
//composables
import { fetchSeasons } from "@/http/eventApi";
import { diffSeasons } from "@/composables/seasons";
//models
import type { ISeason } from "@/models/season";
//variables
const isUpcoming = ref(true);
const seasons = ref<ISeason[]>();
const upcomingSeasons = ref<ISeason[]>();
const completedSeasons = ref<ISeason[]>();

onMounted(async () => {
  document.querySelector("main")?.scrollTo(0, 0);
  const response = await fetchSeasons("soccer");
  seasons.value = response;
  if (seasons.value !== undefined) {
    const { completed, upcoming } = diffSeasons(seasons.value);
    upcomingSeasons.value = upcoming;
    completedSeasons.value = completed;
  }
});
const sortedSeasons = computed<ISeason[] | undefined>(() => {
  if (isUpcoming.value) {
    return upcomingSeasons.value;
  }
  return completedSeasons.value;
});
// func
const changeSeasonStatus = (status: boolean) => {
  isUpcoming.value = status;
};
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center col-span-2 sm:col-span-1">
        <component
          :is="SupportIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">Soccer</h1>
      </div>
      <div class="flex justify-start sm:justify-center">
        <div class="tabs tabs-boxed">
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': isUpcoming }"
            @click="changeSeasonStatus(true)"
          >
            <span class="hidden md:block">Upcoming</span>
            <component
              :is="ArrowCircleRightIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': !isUpcoming }"
            @click="changeSeasonStatus(false)"
          >
            <span class="hidden md:block">Completed</span>
            <component
              :is="CheckCircleIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
        </div>
      </div>
      <div class="flex justify-end">
        <select
          class="select select-bordered select-sm max-w-xs ml-6"
          value="ALL"
        >
          <option>ALL</option>
        </select>
      </div>
    </div>
  </div>
  <div class="relative">
    <CollapseSoccer
      v-for="season in sortedSeasons"
      :key="season._id"
      :season="season"
    />
  </div>
</template>

<style scoped></style>

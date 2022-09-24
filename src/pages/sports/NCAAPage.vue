<script setup lang="ts">
import { fetchSeasons } from "@/http/sportsApi";
import { onMounted, ref, computed } from "vue";
// components
import TitleNCAA from "@/components/Titles/TitleNCAA.vue";
import CollapsesSeason from "@/components/Collapses/CollapsesSeason.vue";
import TheSpinner from "@/components/TheSpinner.vue";
// composables
import { checkData } from "@/composables/functions";
// models
import type { ISeason } from "@/models/sportModel";

const seasonsResponse = ref<ISeason[]>([]);

const seasonsUpcoming = ref<ISeason[]>([]);
const seasonsCompleted = ref<ISeason[]>([]);
//
const isUpcoming = ref(true);
const isReady = ref(false);

onMounted(async () => {
  document.querySelector("main")?.scrollTo(0, 0);

  const { data } = await fetchSeasons("ncaa");
  seasonsResponse.value = data;
  const { upcoming, completed } = checkData(data);
  seasonsCompleted.value = completed;
  seasonsUpcoming.value = upcoming;
  isReady.value = true;
});

const seasons = computed(() => {
  if (isUpcoming.value) {
    return seasonsUpcoming.value;
  }
  return seasonsCompleted.value;
});

const changeTab = (status: boolean) => {
  isUpcoming.value = status;
};
</script>

<template>
  <div class="flex flex-col h-full">
    <TitleNCAA @change-tab="changeTab" :active-tab="isUpcoming" />
    <CollapsesSeason
      v-if="isReady"
      :seasons="seasons"
      :is-upcoming="isUpcoming"
    />
    <div class="flex items-center mt-10 flex-1" v-else>
      <TheSpinner />
    </div>
  </div>
</template>

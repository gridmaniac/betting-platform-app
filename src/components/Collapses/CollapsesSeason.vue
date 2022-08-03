<script setup lang="ts">
// model
import type { ISeason } from "@/models/sportModel";
// components
import CollapseSeason from "@/components/Collapses/CollapseSeason.vue";

interface IProps {
  seasons: ISeason[];
  isUpcoming: boolean;
}
defineProps<IProps>();
</script>

<template>
  <div class="mt-6">
    <CollapseSeason
      v-for="(season, i) in seasons"
      :key="season.id + isUpcoming ? 1 : 0"
      :season="season"
      :number="i"
      :is-upcoming="isUpcoming"
    />
  </div>
</template>

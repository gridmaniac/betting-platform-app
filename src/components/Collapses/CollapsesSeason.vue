<script setup lang="ts">
// model
import type { ISeason } from "@/models/sportModel";
// components
import CollapseSeason from "@/components/Collapses/CollapseSeason.vue";

interface IProps {
  seasons: ISeason[];
}
defineProps<IProps>();
</script>

<template>
  <div class="mt-6">
    <CollapseSeason
      v-for="(season, i) in seasons"
      :key="season.id"
      :season="season"
      :number="i"
    />
  </div>
</template>

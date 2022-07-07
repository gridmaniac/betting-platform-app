<script setup lang="ts">
import type { ICompetitor } from "@/models/season";

interface IProps {
  competitor: ICompetitor;
}
defineProps<IProps>();
</script>

<template>
  <div
    class="competitor flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
  >
    <div class="avatar w-10">
      <div class="w-12 h-12 mask mask-squircle">
        <img
          src="../assets/silhouette.png"
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
    <div class="text-left sm:text-center">
      <div class="font-bold">
        {{ competitor.name }}
      </div>
      <div class="text-sm opacity-50">
        {{ competitor.abbreviation || competitor.qualifier }}
        <!-- ask Anton -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>

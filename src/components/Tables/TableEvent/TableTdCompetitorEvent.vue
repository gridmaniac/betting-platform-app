<script setup lang="ts">
import type { ICompetitor } from "@/models/sportModel";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
interface IProps {
  competitor: ICompetitor;
}
const props = defineProps<IProps>();

const imgPlaceholder = (e: any) => {
  e.target.src =
    "https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png";
};

const sportType = route.meta.sportType;
const imgLoaded = ref(false);
const imgUrl = `https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/${sportType}/${props.competitor.name}.webp`;
const placeholderUrl =
  "https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png";
</script>

<template>
  <div
    class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col competitor"
  >
    <div class="avatar w-10">
      <div class="w-12 h-12 mask mask-squircle">
        <img v-show="!imgLoaded" :src="placeholderUrl" />
        <img
          v-show="imgLoaded"
          :src="imgUrl"
          :alt="competitor.name"
          @error="imgPlaceholder"
          @load="imgLoaded = true"
        />
      </div>
    </div>
    <div class="text-left sm:text-center competitor-content">
      <div class="font-bold">
        <p class="truncate competitor-name">
          {{ competitor.name }}
        </p>
      </div>
      <div class="text-sm opacity-50">
        {{ competitor.abbreviation || competitor.qualifier }}
        <!-- ask Anton -->
      </div>
    </div>
  </div>
</template>

<style>
.competitor-name {
  width: 200px;
}

@media screen and (max-width: 576px) {
  .competitor-name {
    width: 100px;
  }
}
</style>

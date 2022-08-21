<script setup lang="ts">
import type { ICompetitor } from "@/models/sportModel";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
interface IProps {
  competitor: ICompetitor;
  side: "left" | "right";
}
const props = defineProps<IProps>();

const imgPlaceholder = (e: any) => {
  e.target.src =
    "https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png";
};

const sportType = route.meta.sportType;
const imgLoaded = ref(false);
const imgUrl = `https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/${sportType}/${props.competitor.name}.webp`;
const placeholderUrl = `https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png`;
</script>

<template>
  <div class="flex items-center space-x-3">
    <div :class="{ 'order-2': side === 'right' }">
      <div class="avatar">
        <div
          class="rounded-full w-14 h-14 shadow"
          :class="{ 'ml-4': side === 'right' }"
        >
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
    </div>
    <div :class="{ 'order-1 text-right': side === 'right' }">
      <h2 class="card-title">
        {{ competitor.name }}
      </h2>
      <p class="text-base-content text-opacity-40">
        {{ competitor.abbreviation }}
      </p>
    </div>
  </div>
</template>

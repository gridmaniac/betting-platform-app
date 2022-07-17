<script setup lang="ts">
import type { ICompetitor } from "@/models/sportModel";
import { useRoute } from "vue-router";

const route = useRoute()
interface IProps {
  competitor: ICompetitor;
  side: "left" | "right";
}
defineProps<IProps>();

const imgPlaceholder = (e: any) => {
  e.target.src =
    "https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png";
};


const sportType = route.meta.sportType
</script>

<template>
  <div class="flex items-center space-x-3">
    <div :class="{ 'order-2': side === 'right' }">
      <div class="avatar">
        <div class="rounded-full w-14 h-14 shadow">
          <img
            :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/${sportType}/${competitor.name}.png`"
            alt="Avatar Tailwind CSS Component"
            @error="imgPlaceholder"
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

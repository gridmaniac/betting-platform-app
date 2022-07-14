<script setup lang="ts">
import type { ICompetitor } from "@/models/sportModel";

interface IProps {
  competitor: ICompetitor;
  side: "left" | "right";
}
defineProps<IProps>();

const imgPlaceholder = () => {
  return null;
  // https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/silhouette.png
};
</script>

<template>
  <div class="flex items-center space-x-3">
    <div :class="{ 'order-2': side === 'right' }">
      <div class="avatar">
        <div class="rounded-full w-14 h-14 shadow">
          <img
            src="@/assets/silhouette.png"
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

  <!-- <div class="flex items-center space-x-3">
        <div class="text-right">
          <h2 class="card-title">fighter 2</h2>
          <p class="text-base-content text-opacity-40">fighter 2 info</p>
        </div>
        <div>
          <div class="avatar">
            <div class="rounded-full w-14 h-14 shadow">
              <img
                src="@/assets/silhouette.png"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
        </div>
      </div> -->
</template>

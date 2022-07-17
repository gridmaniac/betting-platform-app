<script setup lang="ts">
import type { ICompetitor } from "@/models/sportModel";
import { useRoute } from "vue-router";
const route = useRoute()
interface IProps {
  competitor: ICompetitor;
}
defineProps<IProps>();

const imgPlaceholder = (e: any) => {
  e.target.src =
    "https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/silhouette.png";
};

const sportType = route.meta.sportType
</script>

<template>
  <div
    class="competitor flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
  >
    <div class="avatar w-10">
      <div class="w-12 h-12 mask mask-squircle">
        <img
          :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/competitors/${sportType}/${competitor.name}.png`"
          alt="Avatar Tailwind CSS Component"
          @error="imgPlaceholder"
        />
      </div>
    </div>
    <div class="text-left sm:text-center">
      <div class="font-bold competitor-name">
        <p>{{ competitor.name }}</p>
      </div>
      <div class="text-sm opacity-50">
        {{ competitor.abbreviation || competitor.qualifier }}
        <!-- ask Anton -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.competitor-name {
  max-width: 140px;
  overflow: hidden;
  p {
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
  }
  @media screen and (max-width: 640px) {
    & {
      max-width: 200px;
      width: 100%;
    }
  }
}
</style>

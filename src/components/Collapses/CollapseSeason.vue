<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
// model
import type { ISeason, IEvent } from "@/models/sportModel";
// api
import { fetchEvents } from "@/http/sportsApi";
// components
import TheCollapse from "@/components/TheCollapse.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import TableEvent from "../Tables/TableEvent/TableEvent.vue";

interface IProps {
  season: ISeason;
}
defineProps<IProps>();

const isLoad = ref(false);
const events = ref<IEvent[]>([]);

const getEvents = async (season: ISeason) => {
  const response = await fetchEvents(season.id);
  events.value = response;
  isLoad.value = true;
};
</script>

<template>
  <TheCollapse @click="getEvents(season)">
    <template #collapse-title>
      <h2 class="text-xl font-medium">{{ season.name }}</h2>
      <p>
        {{ moment(season.startDate).format("D MMMM YYYY") }} -
        {{ moment(season.endDate).format("D MMMM YYYY") }}
      </p>
    </template>
    <template #collapse-body>
      <TableEvent v-if="isLoad" :events="events" />
      <TheSpinner v-else />
    </template>
  </TheCollapse>
</template>

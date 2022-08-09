<script setup lang="ts">
import { ref, watch } from "vue";
import moment from "moment";
// model
import type { ISeason, IEvent } from "@/models/sportModel";
// api
import { fetchEvents } from "@/http/sportsApi";
// components
import TheCollapse from "@/components/TheCollapse.vue";
import TableEvent from "../Tables/TableEvent/TableEvent.vue";
// props
interface IProps {
  season: ISeason;
  number: number;
  isUpcoming: boolean;
}
const props = defineProps<IProps>();
// vars
const isResponse = ref(false);
const isCollapseOpen = ref(false);
const events = ref<IEvent[]>([]);

if (props.number === 0) {
  getEvents(props.season);
  isCollapseOpen.value = true;
}

watch(
  () => props.isUpcoming,
  () => {
    if (props.number === 0) {
      getEvents(props.season);
      isCollapseOpen.value = true;
    }
  }
);

async function getEvents(season: ISeason) {
  isResponse.value = true
  const response: IEvent[] = await fetchEvents(season.id, props.isUpcoming);
  isResponse.value = false;
  events.value = response;
}
</script>

<template>
  <TheCollapse @open-collapse="getEvents(season)" v-model="isCollapseOpen" class="mb-6">
    <template #collapse-title>
      <h2 class="text-xl font-medium">{{ season.name }}</h2>
      <p>
        {{ moment(season.startDate).format("D MMMM YYYY") }} -
        {{ moment(season.endDate).format("D MMMM YYYY") }}
      </p>
    </template>
    <template #collapse-body>
      <template v-if="!isResponse">
        <TableEvent v-if="events.length" :events="events" :season="season" />
        <div v-else class="text-center flex justify-center items-center h-20">
          <p>All events was completed</p>
        </div>
      </template>
      <div v-else class="flex justify-center my-10">
        <button class="btn btn-ghost loading">loading</button>
      </div>
    </template>
  </TheCollapse>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import moment from "moment";
//components
import EventMMA from "./EventMMA.vue";
import ModalBet from "./Modals/ModalBet.vue";
import CollapseView from "./CollapseView.vue";
//composables
import { fetchEvents } from "@/http/events";
//models
import type { ISeason, IEvent, ICompetitor } from "@/models/season";

interface IProp {
  season: ISeason;
}
const props = defineProps<IProp>();

const events = ref<IEvent[]>();
//modal bet
const isModalBetVisible = ref(false);
const modalSeason = ref<ISeason>();
const modalEvent = ref<IEvent>();
const winner = ref<ICompetitor>();
provide("modalBet", {
  isModalBetVisible,
  modalSeason,
  modalEvent,
  winner,
});
modalSeason.value = props.season;
//functions
const getEvents = async (season: ISeason) => {
  const response = await fetchEvents(season.id);
  events.value = response;
};
</script>

<template>
  <Teleport to="body">
    <ModalBet />
  </Teleport>
  <CollapseView @click="getEvents(season)">
    <template #collapse-title>
      <h2 class="text-xl font-medium">{{ season.name }}</h2>
      <p class="pb-1">{{ moment(season.startDate).format("D MMMM, YYYY") }}</p>
    </template>
    <template #collapse-body>
      <table class="table table-zebra table-compact w-full">
        <thead>
          <td class="text-center">
            {{ moment(season.startDate).format("h:mm A") }}
          </td>
          <td class="text-center">winner</td>
        </thead>
        <tbody>
          <EventMMA v-for="event in events" :key="event._id" :event="event" />
        </tbody>
      </table>
    </template>
  </CollapseView>
</template>

<style scoped>
.collapse-content,
.collapse-title {
  background-color: #000;
}

.collapse-open .collapse-content,
.collapse:focus:not(.collapse-close) .collapse-content,
.collapse:not(.collapse-close)
  input[type="checkbox"]:checked
  ~ .collapse-content {
  max-height: 100%;
}
</style>

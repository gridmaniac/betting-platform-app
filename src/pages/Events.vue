<script setup>
import { ref, computed, onMounted } from "vue";
import moment from "moment";
//icon
import { LightningBoltIcon } from "@heroicons/vue/outline";
import { ArrowCircleRightIcon } from "@heroicons/vue/outline";
import { CheckCircleIcon } from "@heroicons/vue/outline";
//components
import Accordion from "../components/Accordion.vue";
import Table from "../components/Table.vue";
//composables
import { fetchEvents, fetchFights } from "../http/events";
import Loader from "../components/Loader.vue";

const isUpcoming = ref(true);
const events = ref([]);
const upcomingEvents = ref([]);
const completedEvents = ref([]);

onMounted(async () => {
  events.value = await fetchEvents();
  events.value.map((event) => {
    event.isChecked = false;
    return event;
  });
  completedEvents.value = events.value
    .filter((x) => {
      const result = moment(x.dateTime).isBefore(moment());
      if (result) return x;
    })
    .reverse();
  // completedEvents.value[0].isChecked = true;
  getFights(completedEvents.value[0]);

  upcomingEvents.value = events.value.filter((x) => {
    const result = moment(x.dateTime).isAfter(moment());
    if (result) return x;
  });
  // upcomingEvents.value[0].isChecked = true;
  getFights(upcomingEvents.value[0]);
});

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});

const sortedEvents = computed(() => {
  if (isUpcoming.value) {
    return upcomingEvents.value;
  }
  return completedEvents.value;
});

const changeEventsStatus = () => {
  isUpcoming.value = !isUpcoming.value;
};

const getFights = async (event) => {
  event.isChecked = !event.isChecked;
  if (event.fights === undefined) {
    event.fights = [];
  }
  if (!event.fights.length) {
    const response = await fetchFights(event.eventId);
    const sortedFilghts = response.filter((x) => {
      if (x.status === null || x.status == "Canceled") {
        return;
      }
      return x;
    });
    event.fights = sortedFilghts;
  }
};
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="grid grid-cols-2 sm:grid-cols-3">
      <div class="flex items-center col-span-2 sm:col-span-1 mb-2 sm:mb-0">
        <component
          :is="LightningBoltIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">Events</h1>
      </div>
      <div class="flex justify-start sm:justify-center">
        <div class="tabs tabs-boxed">
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': isUpcoming }"
            @click="changeEventsStatus(true)"
          >
            <span class="hidden md:block">Upcoming</span>
            <component
              :is="ArrowCircleRightIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': !isUpcoming }"
            @click="changeEventsStatus(false)"
          >
            <span class="hidden md:block">Completed</span>
            <component
              :is="CheckCircleIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
        </div>
      </div>
      <div class="flex justify-end">
        <select
          class="select select-bordered select-sm max-w-xs ml-6"
          value="UFC"
        >
          <option disabled>Choose promotion</option>
          <option selected="selected">UFC</option>
        </select>
      </div>
    </div>
  </div>
  <div class="relative max-w-6xl">
    <Loader v-if="events === []"/>
    <Accordion
      v-for="event in sortedEvents"
      :key="event.eventId"
      :event="event"
      @click="getFights(event)"
      :checked="event.isChecked"
    >
      <template #title>{{ event.name }}</template>
      <template #description>{{
        moment(event.dateTime).format("MMMM DD, YYYY")
      }}</template>
      <template #body>
        <Table v-if="event.fights" :rows="event.fights"></Table>
      </template>
    </Accordion>
  </div>
</template>

<style scoped></style>

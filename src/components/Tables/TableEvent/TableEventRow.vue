<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
// type
import type { ICompetitor, IEvent, ISeason } from "@/models/sportModel";
// component
import EventButton from "@/components/EventButton.vue";
import TableTdCompetitorEvent from "./TableTdCompetitorEvent.vue";
import TheBadge from "../../TheBadge.vue";
// store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
const authStore = useAuthStore();
const modalStore = useModalStore();
// props
interface IProps {
  event: IEvent;
  season: ISeason;
}
const props = defineProps<IProps>();
//vars
const eventStatus = ref<boolean>();
const closeTime = moment(props.event.closeTime).utc().format();
const currTime = moment().utc().format();
if (!moment(currTime).isBefore(closeTime)) {
  eventStatus.value = true;
} else {
  if (props.event.status !== "not_started") {
    eventStatus.value = true;
  }
}

const openModal = (winner: ICompetitor) => {
  if (!authStore.isAuth) {
    modalStore.isModalAuthVisible = true;
    return;
  }
  if (!eventStatus.value) {
    modalStore.ModalBetContent = {
      event: props.event,
      season: props.season,
      winner: winner,
    };
    modalStore.isModalBetVisible = true;
  }
};
</script>

<template>
  <tr>
    <td>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <TableTdCompetitorEvent :competitor="event.competitors[0]" />
        <TheBadge :event="event" class="hidden sm:block" />
        <TableTdCompetitorEvent :competitor="event.competitors[1]" />
      </div>
    </td>
    <td>
      <div class="flex flex-col items-center">
        <p class="inline-flex">
          {{ moment(event.startTime).format("D MMM") }}
        </p>
        <p class="mb-2 text-white">
          {{ moment(event.startTime).format("h:mm A") }}
        </p>
        <TheBadge :event="event" class="sm:hidden" />
      </div>
    </td>
    <td>
      <div class="flex flex-col sm:flex-row sm:justify-center">
        <EventButton
          :status="eventStatus"
          @click="openModal(event.competitors[0])"
          class="mb-2 sm:mr-2 sm:mb-0"
        />
        <EventButton
          :status="eventStatus"
          @click="openModal(event.competitors[1])"
        />
      </div>
    </td>
  </tr>
</template>

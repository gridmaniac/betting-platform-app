<script setup lang="ts">
//assets
import { ref, computed, inject } from "vue";
import moment from "moment";
//models
import type { ICompetitor, IEvent } from "@/models/season";
//components
import TheCompetitor from "./TheCompetitor.vue";
import EventButton from "./EventButton.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
//props
interface IProps {
  event: IEvent;
}
const props = defineProps<IProps>();

// modal login
const { isModalAuthVisible, isLogin } = inject<any>("auth");
const loginAccount = () => {
  isLogin.value = true;
  isModalAuthVisible.value = true;
};

//modal bet
const { isModalBetVisible, modalEvent, winner } = inject<any>("modalBet");
// variables
const currentEventStatus = ref("accent");
//computed
const eventStatus = computed(() => {
  if (props.event.status === "not_started") {
    return false;
  }
  return true;
});
//functions
const setEventStatus = (event: IEvent) => {
  if (event.status === "closed") {
    currentEventStatus.value = "secondary";
    if (event.winnerId) {
      if (event.competitors[0].id === event.winnerId) {
        return "1 : 0";
      } else {
        return "0 : 1";
      }
    } else {
      return `${event.homeScore} - ${event.awayScore}`;
    }
  }
  if (event.status === "not_started") {
    currentEventStatus.value = "";
    return "0 - 0";
  }
  if (event.status === "cancelled" || event.status === "postponed") {
    currentEventStatus.value = "accent";
    return "0 - 0";
  }
  return event.status;
};
const openModal = (competitor: ICompetitor) => {
  isModalBetVisible.value = true;
  winner.value = competitor;
  modalEvent.value = props.event;
};
</script>

<template>
  <tr>
    <td>
      <div
        class="flex items-start content- sm:items-center flex-col sm:flex-row"
      >
        <TheCompetitor :competitor="event.competitors[0]" side="left" />
        <div class="flex flex-col items-center">
          <div
            class="badge hidden sm:inline-flex"
            :class="['badge-' + currentEventStatus]"
          >
            {{ setEventStatus(event) }}
          </div>
        </div>
        <TheCompetitor :competitor="event.competitors[1]" side="right" />
      </div>
    </td>
    <td>
      <div class="flex flex-col items-center">
        <p class="mb-2 text-white hidden sm:inline-flex">
          {{ moment(event.startTime).format("D MMM") }}
        </p>
        <p class="mb-2 text-white hidden sm:inline-flex">
          {{ moment(event.startTime).format("h:mm A") }}
        </p>
      </div>
    </td>
    <td>
      <div
        class="flex justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 flex-col sm:flex-row"
      >
        <EventButton
          :disabled="eventStatus"
          @click="
            authStore.isAuth ? openModal(event.competitors[0]) : loginAccount()
          "
          :status="eventStatus"
        />
        <EventButton
          :disabled="eventStatus"
          @click="
            authStore.isAuth ? openModal(event.competitors[1]) : loginAccount()
          "
          :status="eventStatus"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { IEvent } from "@/models/sportModel";

interface IProps {
  event: IEvent;
}
defineProps<IProps>();

const setEventStatus = (event: IEvent) => {
  console.log(event);

  if (event.status === "closed") {
    if (event.winnerId) {
      if (event.competitors[0].id === event.winnerId) return "1 - 0";
      else return "0 - 1";
    }
    if (!event.winnerId) {
      if ("homeScore" in event && "awayScore" in event)
        return `${event.homeScore} - ${event.awayScore}`;
      else return "1 - 1";
    }
  }
  if (event.status === "not_started") return "0 - 0";
  if (event.status === "cancelled" || event.status === "postponed")
    return "0 - 0";
  return event.status;
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="badge sm:inline-flex"
      :class="{
        'badge-secondary': event.status === 'closed',
        'badge-accent':
          event.status === 'cancelled' || event.status === 'postponed',
      }"
    >
      {{ setEventStatus(event) }}
    </div>
  </div>
</template>

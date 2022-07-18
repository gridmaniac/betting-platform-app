<script setup lang="ts">
// type
import type { IEvent, ISeason } from "@/models/sportModel";
import TableEventRow from "./TableEventRow.vue";

interface IProps {
  events: IEvent[];
  season: ISeason;
}
defineProps<IProps>();
</script>

<template>
  <table class="table table-zebra table-compact w-full">
    <thead>
      <tr>
        <th class="text-center w-3/5">COMPETITORS</th>
        <th class="text-center">TIME</th>
        <th class="text-center">WINNER</th>
      </tr>
    </thead>
    <tbody>
      <TableEventRow
        v-for="event in events"
        :key="event.id"
        :event="event"
        :season="season"
      />
    </tbody>
  </table>
</template>

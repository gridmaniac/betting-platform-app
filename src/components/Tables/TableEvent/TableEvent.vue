<script setup lang="ts">
// type
import type { IEvent } from "@/models/sportModel";
import TableEventRow from "./TableEventRow.vue";

interface IProps {
  events: IEvent[];
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
      <TableEventRow v-for="event in events" :key="event.id" :event="event" />
    </tbody>
  </table>
</template>

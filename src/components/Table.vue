<script setup>
import Event from "./Event.vue"
import moment from "moment"
defineProps({
    rows: Array,
    time: Object
})
</script>

<template>
  <table class="table table-zebra table-compact w-full">
    <thead>
      <tr>
        <th class="text-left sm:text-center">
          <div class="badge badge-ghost">{{ moment(time).format("h:mm a") }}</div>
        </th>

        <th align="center">Winner</th>
      </tr>
    </thead>
    <tbody>
      <Event v-for="item in rows" :key="item.id" :item="item" />
    </tbody>
  </table>
</template>

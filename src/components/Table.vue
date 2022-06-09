<script setup>
import Event from "./Event.vue"
import moment from "moment"
const props = defineProps({
    rows: Array,
    eventItem: Object
})

console.log(props.rows);
</script>

<template>
  <table class="table table-zebra table-compact w-full">
    <thead>
      <tr>
        <th class="text-left sm:text-center fix-it-pls">
          <div class="badge badge-ghost">{{ moment(eventItem.dataTime).format("h:mm a") }}</div>
        </th>

        <th align="center">Winner</th>
      </tr>
    </thead>
    <tbody>
      <Event v-for="item in rows" :key="item._id" :item="item" :eventName="eventItem"/>
    </tbody>
  </table>
</template>

<style>
.fix-it-pls {
  width: 60%;
}

@media screen and (max-width: 640px) {
  .fix-it-pls {
    width: 75%
  }
}
</style>

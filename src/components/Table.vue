<script setup>
import Event from "./Event.vue"

defineProps({
    rows: Array
})
</script>

<template>
  <table class="table table-zebra table-compact w-full">
    <thead>
      <tr>
        <th class="text-left sm:text-center">
          <div class="badge badge-ghost">7:30 PM</div>
        </th>

        <th align="center">Winner</th>
      </tr>
    </thead>
    <tbody>
      <Event v-for="item in rows" :key="item.id" :item="item" />
    </tbody>
  </table>
</template>

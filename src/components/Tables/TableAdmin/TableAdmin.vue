<script setup lang="ts">
import TableItem from "./TableItem.vue";
import type { ISetting } from "@/models/admin/ISetting";

interface IProps {
  settings: ISetting[];
}

defineProps<IProps>();
defineEmits(["updateSettings"]);
</script>

<template>
  <table class="table table-compact w-full table-zebra">
    <thead>
      <tr>
        <th>name</th>
        <th>value</th>
        <th class="text-right">contols</th>
      </tr>
    </thead>
    <tbody>
      <TableItem
        v-for="setting in settings"
        :key="setting._id"
        :setting="setting"
        @update-settings="$emit('updateSettings')"
      />
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  table {
    display: block;
    width: 100%;
  }
  thead {
    display: none;
  }
  tbody {
    display: block;
    width: 100%;
  }
}
</style>

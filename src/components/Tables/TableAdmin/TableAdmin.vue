<script setup lang="ts">
import TableItem from "./TableItem.vue";

interface ISetting {
  name: string;
  value: string;
  __v: number;
  _id: string;
}

interface IProps {
  settings: ISetting[];
}

const props = defineProps<IProps>();
const emit = defineEmits(["updateSettings"]);

const removeSetting = (setting: ISetting) => {
  const newArray = props.settings.filter((x) => x._id !== setting._id);
  emit("updateSettings", newArray);
};
</script>

<template>
  <table class="table table-compact w-full table-zebra">
    <thead>
      <tr>
        <th>name</th>
        <th>value</th>
        <th>contols</th>
      </tr>
    </thead>
    <tbody>
      <TableItem
        v-for="setting in settings"
        :key="setting._id"
        :setting="setting"
        @remove-setting="removeSetting"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ISetting } from "@/models/admin/ISetting";
import SettingEditForm from "../../Forms/SettingEditForm.vue";

interface IProps {
  setting: ISetting;
}

defineProps<IProps>();
const emit = defineEmits(["updateSettings"]);
// vars
const isEdit = ref(false);

const update = () => {
  isEdit.value = false;
  emit("updateSettings");
};
</script>

<template>
  <tr v-if="!isEdit">
    <td data-name="name">{{ setting.name }}</td>
    <td data-name="value" class="value">
      {{ setting.value }}
    </td>
    <td data-name="controls">
      <div class="flex md:justify-end">
        <button class="btn btn-sm btn-outline" @click="isEdit = true">
          edit
        </button>
      </div>
    </td>
  </tr>
  <SettingEditForm v-else :setting="setting" @update-settings="update" />
</template>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .value {
    max-width: 100%;
  }

  tr {
    width: 100%;
    display: flex;
    flex-direction: column;

    td {
      width: 100%;
      display: flex;
      flex-direction: column;

      &::before {
        content: attr(data-name);
        color: white;
        text-transform: capitalize;
        margin-bottom: 10px;
      }

      &.controls {
        display: flex;
      }
    }
  }
}
</style>

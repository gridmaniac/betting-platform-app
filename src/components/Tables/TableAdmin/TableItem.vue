<script setup lang="ts">
import { ref } from "vue";

interface ISetting {
  name: string;
  value: string;
  __v: number;
  _id: string;
}

interface IProps {
  setting: ISetting;
}

defineProps<IProps>();
const emit = defineEmits(["removeSetting"]);
// vars
const isEdit = ref(false);
const newValue = ref();

const edit = () => {
  isEdit.value = true;
};

const save = () => {
  isEdit.value = false;
};

const remove = (setting: ISetting) => {
  emit("removeSetting", setting);
  isEdit.value = false;
};
</script>

<template>
  <tr>
    <th>{{ setting.name }}</th>
    <th style="max-width: 200px">
      <div class="v-full overflow-hidden">
        <template v-if="!isEdit">
          {{ setting.value }}
        </template>
        <template v-else>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model="newValue"
          />
        </template>
      </div>
    </th>
    <th>
      <template v-if="!isEdit">
        <button class="btn btn-outline" @click="edit">edit</button>
      </template>
      <template v-else>
        <button class="btn btn-outline mr-2" @click="save">save</button>
        <button class="btn btn-outline" @click="remove(setting)">delete</button>
      </template>
    </th>
  </tr>
</template>

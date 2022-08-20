<script setup lang="ts">
import { computed } from "vue";
interface IOption {
  value: string | boolean | number;
  name: string;
}

interface IProps {
  modelValue: string | number | boolean;
  title: string;
  options: IOption[];
  placeholder?: IOption;
}
const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue"]);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">{{ title }}</span>
      <!-- <span class="label-text-alt">Alt label</span> -->
    </label>
    <select class="select select-bordered" v-model="active">
      <option v-if="placeholder" disabled selected>
        {{ placeholder.name }}
      </option>
      <template v-if="options">
        <option v-for="option in options" :key="option.name">
          {{ option.name }}
        </option>
      </template>
    </select>
    <!-- <label class="label">
    <span class="label-text-alt">Alt label</span>
    <span class="label-text-alt">Alt label</span>
  </label> -->
  </div>
</template>

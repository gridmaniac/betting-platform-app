<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  modelValue: string | number;
  type?: string;
  title?: string;
  placeholder?: string;
  error?: string;
  small?: boolean;
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
    <label class="label" v-if="title">
      <span class="label-text">{{ title }}</span>
      <!-- <span class="label-text-alt">Alt label</span> -->
    </label>
    <input
      :type="type"
      class="input input-bordered w-full"
      :class="{ 'input-sm': small }"
      v-model="active"
      :placeholder="placeholder"
    />
    <label class="label" v-if="error">
      <span class="label-text-alt">{{ error }}</span>
      <!-- <span class="label-text-alt">Alt label</span> -->
    </label>
  </div>
</template>

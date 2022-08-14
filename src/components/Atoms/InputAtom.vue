<script setup lang="ts">
import { computed } from "vue";
interface IProps {
  modelValue: string;
  title: string;
}
const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue"]);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ title }}</span>
      <!-- <span class="label-text-alt">Alt label</span> -->
    </label>
    <input
      type="text"
      class="input input-bordered w-full max-w-xs"
      v-model="active"
    />
    <!-- <label class="label">
      <span class="label-text-alt">Alt label</span>
      <span class="label-text-alt">Alt label</span>
    </label> -->
  </div>
</template>

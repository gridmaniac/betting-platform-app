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
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ title }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      v-model="active"
    ></textarea>
    <!-- <label class="label">
    <span class="label-text-alt">Your bio</span>
    <span class="label-text-alt">Alt label</span>
  </label>  -->
  </div>
</template>

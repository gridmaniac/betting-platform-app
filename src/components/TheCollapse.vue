<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["openCollapse", "update:modelValue"]);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

</script>

<template>
  <div
    tabindex="0"
    class="collapse shadow-xl bg-base-100 my-6 rounded-box collapse-arrow w-full"
  >
    <input type="checkbox" @click="$emit('openCollapse')" v-model="active" />
    <div class="collapse-title">
      <slot name="collapse-title"></slot>
    </div>
    <div class="collapse-content">
      <slot name="collapse-body"></slot>
    </div>
  </div>
</template>

<style scoped>
.collapse-content,
.collapse-title {
  background-color: #000;
}
.collapse-open .collapse-content,
.collapse:focus:not(.collapse-close) .collapse-content,
.collapse:not(.collapse-close)
  input[type="checkbox"]:checked
  ~ .collapse-content {
  max-height: 100%;
}
</style>

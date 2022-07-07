<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modalId: String,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "modalEvent", "closeModal"]);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <input type="checkbox" :id="modalId" class="modal-toggle" v-model="active" />
  <label :for="modalId" class="modal cursor-pointer">
    <label class="modal-box relative">
      <slot></slot>
    </label>
  </label>
</template>

<style></style>

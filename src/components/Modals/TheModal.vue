<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "modalEvent", "closeModal"]);

const modal = ref(null);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

onClickOutside(modal, () => {
  emit("closeModal");
});
</script>

<template>
  <input type="checkbox" class="modal-toggle" v-model="active" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box" ref="modal">
      <slot />
    </div>
  </div>
</template>

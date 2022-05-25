<script setup>

import { computed } from "vue"

const props = defineProps({
  modalId: String,
  btns: Array,
  modelValue: Boolean,
});

const emit = defineEmits(["modalEvent", "closeModal"]);

const active = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const modalEvent = (btn) => {
  emit("modalEvent", btn);
};

// const closeModal = () => {
//   emit("closeModal", false)
//   console.log("test");
// }
</script>

<template>
  <input type="checkbox" :id="modalId" class="modal-toggle" v-model="active" />
  <label :for="modalId" class="modal cursor-pointer">
    <label class="modal-box relative">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer v-if="btns">
        <slot name="footer"></slot>
      </footer>
    </label>
  </label>
</template>

<style></style>

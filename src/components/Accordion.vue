<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  checked: Boolean,
});
const isChecked = ref(props.checked);
</script>

<template>
  <div tabindex="0" class="collapse shadow-xl bg-base-100 mx-2 my-6 sm:m-6 rounded-box collapse-arrow w-full">
    <input type="checkbox" :checked="isChecked && 'checked'" />
    <div class="collapse-title" style="background-color: #000">
      <h2 class="text-xl font-medium">
        <slot name="title"></slot>
      </h2>
      <p class="pb-1">
        <slot name="description"></slot>
      </p>
    </div>
    <div class="collapse-content" style="background-color: #000">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <div
    tabindex="0"
    class="collapse shadow-xl bg-base-100 my-6 rounded-box collapse-arrow w-full"
  >
    <input type="checkbox" />
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

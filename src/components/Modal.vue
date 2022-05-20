<script setup>
defineProps({
  modalId: String,
  btns: Array,
  checked: Boolean
});
const emit = defineEmits(["modalEvent", "closeModal"])

const modalEvent = (btn) => {
  emit("modalEvent", btn);
}

const closeModal = () => {
  emit("closeModal", false)
  console.log("test");
}
</script>

<template>
  <input type="checkbox" :id="modalId" class="modal-toggle" :checked="checked"/>
  <label :for="modalId" class="modal cursor-pointer" @click="closeModal">
    <div class="modal-box relative" for="">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer v-if="btns">
        <div class="modal-action">
          <template v-for="btn in btns">
            <label :for="modalId" class="btn" :class="btn.class" @click="modalEvent(btn), closeModal">
              {{ btn.name }}
            </label>
          </template>
        </div>
      </footer>
    </div>
  </label>
</template>

<style>
</style>

<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 10px solid #f8cb48;
  border-radius: 50%;
  border-bottom-color: transparent;
  animation-name: spin;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

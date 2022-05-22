<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 60px;
  height: 60px;
  border: 10px solid #f8cb48;
  border-bottom: 10px solid transparent;
  border-radius: 50%;
  animation-name: loading;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  z-index: 100;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<script setup>
defineProps({
  image: String,
});
</script>

<template>
  <a href="#" class="card bg-base-100 shadow-xl h-max hover:opacity-80">
    <div class="card-body">
      <h2 class="card-title">Islam Makhachev smashes Bobby Green in minutes</h2>
      <p class="text-primary">
        Islam Makhachev earns another dominant win over Bobby Green at UFC Vegas
        49.
      </p>
      <div class="justify-end card-actions">
        <div class="badge badge-outline mt-3">FanSided</div>
      </div>
    </div>
    <figure>
      <img :src="image" alt="Shoes" class="w-full object-cover" />
    </figure>
  </a>
</template>

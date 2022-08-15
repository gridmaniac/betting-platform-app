<script setup lang="ts">
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminDeposits } from "@/composables/titlesState";
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminDeposits" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <button class="btn btn-outline">start</button>
    </div>
  </div>
</template>

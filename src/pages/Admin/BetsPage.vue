<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminBets } from "@/composables/titlesState";
// types
import type { IAsset } from "@/models/admin/IAsset";
// vars
const assets = ref<IAsset[]>([]);

onMounted(async () => {
  const assetsResponse = await AdminServiece.getAssets();
  assets.value = assetsResponse.data.data;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminBets" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6"></div>
  </div>
</template>

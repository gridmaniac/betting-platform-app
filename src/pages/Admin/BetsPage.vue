<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminBets } from "@/composables/titlesState";
// types
import type { IUser } from "@/models/admin/IUser";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";

// vars
const bets = ref<IUser[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminServiece.getBets();
  bets.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminBets" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <LoadingAtom v-if="isRequest" />
      <template v-else> </template>
    </div>
  </div>
</template>

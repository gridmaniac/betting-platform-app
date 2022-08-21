<script setup lang="ts">
import AdminService from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
import TableAtom from "@/components/Atoms/TableAtom.vue";
import WrapperAtom from "@/components/Atoms/WrapperAtom.vue";
import LoadingAtom from "@/components/Atoms/LoadingAtom.vue";
// title
import { TitleAdminBalances } from "@/composables/titlesState";
import { cols } from "@/composables/adminBalances";
// types
import type { IBalance } from "@/models/admin/IBalance";

// vars
const balances = ref<IBalance[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminService.getBalances();
  balances.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <TheTitle :title="TitleAdminBalances" />
  <WrapperAtom class="mt-6">
    <LoadingAtom v-if="isRequest" />
    <TableAtom
      v-else
      :cols="cols"
      :rows="balances"
      :size="12"
      not-found="no balances"
    />
  </WrapperAtom>
</template>

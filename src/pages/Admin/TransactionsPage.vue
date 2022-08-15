<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminTransactions } from "@/composables/titlesState";
// types
import type { IAssetResponse } from "@/models/admin/IAsset";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";
// vars
const transactions = ref<IAssetResponse[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminServiece.getTransactions();
  console.log(response.data);
  transactions.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminTransactions" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <LoadingAtom v-if="isRequest" />
      <template v-else>
        <table class="table table-compact table-zebra w-full">
          <thead>
            <tr>
              <th>1</th>
              <th>1</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

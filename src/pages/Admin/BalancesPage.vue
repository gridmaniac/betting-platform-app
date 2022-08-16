<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminBalances } from "@/composables/titlesState";
// types
import type { IBalance } from "@/models/admin/IBalance";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";

// vars
const balances = ref<IBalance[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminServiece.getBalances();
  console.log(response.data);

  balances.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminBalances" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <LoadingAtom v-if="isRequest" />
      <template v-else>
        <table class="table table-compact table-zebra w-full">
          <thead>
            <tr>
              <th>code</th>
              <th>user id</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="balance in balances" :key="balance._id">
              <td>{{ balance.code }}</td>
              <td>{{ balance.userId }}</td>
              <td>
                {{ balance.amount }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

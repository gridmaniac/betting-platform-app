<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
import moment from "moment";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminTransactions } from "@/composables/titlesState";
// types
import type { ITransaction } from "@/models/admin/ITransaction";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";
// vars
const transactions = ref<ITransaction[]>([]);
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
              <th>userId</th>
              <th>txHash</th>
              <th>code</th>
              <th>amount</th>
              <th>type</th>
              <th>date</th>
              <th>status</th>
              <th>address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction._id">
              <td>{{ transaction.userId }}</td>
              <td>
                <a :href="transaction.txHash" target="_blank">
                  <button
                    class="btn btn-outline btn-sm"
                    :disabled="!transaction.txHash"
                  >
                    eth
                  </button></a
                >
              </td>
              <td>{{ transaction.code }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.type }}</td>
              <td>
                {{ moment(transaction.date).format("HH:mm:ss DD/MM/YYYY") }}
              </td>
              <td>{{ transaction.status }}</td>
              <td>
                <a :href="transaction.address" target="_blank"
                  ><button
                    class="btn btn-outline btn-sm"
                    :disabled="!transaction.address"
                  >
                    address
                  </button></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

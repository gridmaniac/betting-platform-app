<script setup lang="ts">
import AdminService from "@/http/adminApi";
import { onMounted, ref } from "vue";
import moment from "moment";
// img
import { GlobeAltIcon } from "@heroicons/vue/outline";
// components
import TheTitle from "@/components/TheTitle.vue";
import LoadingAtom from "@/components/Atoms/LoadingAtom.vue";
import TableAtom from "@/components/Atoms/TableAtom.vue";
import WrapperAtom from "@/components/Atoms/WrapperAtom.vue";
// title
import { TitleAdminTransactions } from "@/composables/titlesState";
import { cols } from "@/composables/adminTransactions";
// types
import type { ITransaction } from "@/models/admin/ITransaction";
// vars
const transactions = ref<ITransaction[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminService.getTransactions();
  transactions.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminTransactions" />
    <WrapperAtom class="mt-6">
      <LoadingAtom v-if="isRequest" />
      <TableAtom
        v-else
        :cols="cols"
        :rows="transactions"
        :size="5"
        not-found="no bets"
      >
        <template #txHash="{ item }">
          <div class="flex justify-center">
            <button class="btn btn-ghost btn-sm" :disabled="!item.txHash">
              <a
                target="_blank"
                :href="'https://etherscan.io/tx/' + item.txHash"
              >
                <component
                  :is="GlobeAltIcon"
                  class="inline-block w-4 h-4 stroke-current"
                ></component>
              </a>
            </button>
          </div>
        </template>
        <template #date="{ item }">
          {{ moment(item.date).format("HH:mm:ss") }} <br />
          {{ moment(item.date).format("DD/MM/YYYY") }}
        </template>
        <template #amount="{ item }">
          {{ item.amount }}
        </template>
        <template #address="{ item }">
          <a :href="item.address" target="_blank"
            ><button class="btn btn-outline btn-sm" :disabled="!item.address">
              address
            </button></a
          >
        </template>
      </TableAtom>
    </WrapperAtom>
  </div>
</template>

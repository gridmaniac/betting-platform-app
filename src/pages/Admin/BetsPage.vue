<script setup lang="ts">
import { onMounted, ref } from "vue";
import moment from "moment";
// api
import AdminService from "@/http/adminApi";
// components
import TheTitle from "@/components/TheTitle.vue";
import LoadingAtom from "@/components/Atoms/LoadingAtom.vue";
import WrapperAtom from "@/components/Atoms/WrapperAtom.vue";
import TableAtom from "@/components/Atoms/TableAtom.vue";
// title
import { TitleAdminBets } from "@/composables/titlesState";
import { cols } from "@/composables/adminBets";
// types
import type { IBet } from "@/models/Bet";

// vars
const bets = ref<IBet[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const { data } = await AdminService.getBets();
  bets.value = data.data;
  isRequest.value = false;
});
</script>

<template>
  <TheTitle :title="TitleAdminBets" />
  <WrapperAtom class="mt-6">
    <LoadingAtom v-if="isRequest" />
    <TableAtom v-else :cols="cols" :rows="bets" :size="12" not-found="no bets">
      <template #amount="{ item }">
        {{ item.amount }}
      </template>
      <template #startTime="{ item }">
        {{ moment(item.startTime).format("HH:mm:ss") }} <br />
        {{ moment(item.startTime).format("DD/MM/YYYY") }}
      </template>
      <template #date="{ item }">
        {{ moment(item.date).format("HH:mm:ss") }} <br />
        {{ moment(item.date).format("DD/MM/YYYY") }}
      </template>
      <template #season="{ item }">
        <div class="no-wrap">
          {{ item.season }}
        </div>
      </template>
      <template #userId="{ item }">
        <div class="no-wrap">
          {{ item.userId }}
        </div>
      </template>
      <template #eventId="{ item }">
        <div class="no-wrap">
          {{ item.eventId }}
        </div>
      </template>
      <template #winner="{ item }">
        <div class="no-wrap">
          {{ item.winner }}
        </div>
      </template>
      <template #winnerId="{ item }">
        <div class="no-wrap">
          {{ item.winnerId }}
        </div>
      </template>
    </TableAtom>
  </WrapperAtom>
</template>

<style scoped lang="scss">
.no-wrap {
  white-space: nowrap;
  width: 100%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

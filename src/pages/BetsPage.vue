<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { TitleMyBets } from "@/composables/titlesState";
// type
import type { IBet, IBetType } from "@/models/Bet";
//composables
import { fetchBets } from "@/http/walletApi";
// components
import TheTitle from "../components/TheTitle.vue";
import TableBet from "../components/Tables/TableBet.vue";

const betType = ref<IBetType>("all");

const bets = ref<IBet[]>([]);
const betsOpened = ref<IBet[]>([]);
const betsSettled = ref<IBet[]>([]);
const betsCancelled = ref<IBet[]>([]);

const isRequest = ref(false);

onMounted(async () => {
  document.querySelector("main")?.scrollTo(0, 0);

  isRequest.value = true;
  const response = await fetchBets();

  isRequest.value = false;
  const array: IBet[] = response.data;
  array.forEach((element) => {
    element.amount = +element.amount.toString().slice(0, -9);
    if (element.status === "open") {
      betsOpened.value.push(element);
    }
    if (element.status === "settled") {
      betsSettled.value.push(element);
    }
    if (element.status === "cancelled") {
      betsCancelled.value.push(element);
    }
  });
  bets.value = array;
});

const sortedBet = computed(() => {
  if (betType.value === "cancelled") {
    return betsCancelled.value;
  }
  if (betType.value === "settled") {
    return betsSettled.value;
  }
  if (betType.value === "open") {
    return betsOpened.value;
  }
  return bets.value;
});
</script>

<template>
  <TheTitle :title="TitleMyBets">
    <template #control-right>
      <select
        class="select select-bordered select-sm max-w-xs"
        v-model="betType"
      >
        <option value="all">ALL</option>
        <option value="cancelled">Cancelled</option>
        <option value="settled">Settled</option>
        <option value="open">Opened</option>
      </select>
    </template>
  </TheTitle>
  <div class="my-6">
    <div class="card shadow-lg compact side bg-base-100 p-3 w-full">
      <div class="flex flex-col">
        <div class="flex flex-col justify-between items-center">
          <div class="h-32 flex justify-center items-center" v-if="isRequest">
            <button class="btn loading" disabled>loading</button>
          </div>
          <TableBet v-else :rows="sortedBet" />
        </div>
      </div>
    </div>
  </div>
</template>

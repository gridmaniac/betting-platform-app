<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { TitleMyBets } from "@/composables/titlesState";
import moment from "moment";
//icons
import token from "../assets/koa-token.png";
//composables
import { useAuthStore } from "@/stores/authStore";
import { fetchBets } from "@/http/walletApi";
import TheTitle from "../components/TheTitle.vue";
const authStore = useAuthStore();

interface IBet {
  amount: number;
  date: string;
  eventId: string;
  season: string;
  startTime: string;
  status: string;
  type: string;
  userId: string;
  winner: string;
  winnerId: string;
  __v: number;
  _id: string;
}

const bets = ref<IBet[]>([]);

onMounted(async () => {
  document.querySelector("main")?.scrollTo(0, 0);

  const response = await fetchBets();
  bets.value = response.data;
});

const currEntries = ref(4);
const pageNumber = ref(1);
const showEntries = [4, 8, 12, 16, 20];
const allItems = bets.value.length;
const allPages = computed(() => {
  return Math.ceil(allItems / currEntries.value);
});
// pagination funct
const currPage = (number: number) => {
  pageNumber.value = number;
};
const paginateItems = computed(() => {
  const from = (pageNumber.value - 1) * currEntries.value;
  const to = from + currEntries.value;
  return bets.value.slice(from, to);
});
const changeSelect = () => {
  if (!paginateItems.value.length) {
    pageNumber.value = 1;
  }
};
</script>

<template>
  <TheTitle :title="TitleMyBets">
    <template #control-right>
      <select
        class="select select-bordered select-sm max-w-xs"
        :class="{ blur: !authStore.isAuth }"
        :disabled="!authStore.isAuth"
        v-model="currEntries"
        @change="changeSelect()"
      >
        <option v-for="entrie in showEntries" :key="entrie" :value="entrie">
          {{ entrie }}
        </option>
      </select>
    </template>
  </TheTitle>
  <div class="relative my-6">
    <div class="card shadow-lg compact side bg-base-100 p-3 w-full">
      <div class="flex flex-col">
        <div class="flex justify-between items-center">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Event</th>
                <th align="center">AMOUNT</th>
                <th align="center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bet in paginateItems" :key="bet._id">
                <td data-name="Event: ">
                  <div class="whitespace-normal">
                    <strong>{{ bet.season }}</strong>
                    <p>{{ moment(bet.date).format("MMMM DD, YYYY") }}</p>
                    <p class="text-primary">Winner: {{ bet.winner }}</p>
                  </div>
                </td>
                <td class="text-center" data-name="amount: ">
                  <span>
                    <img class="inline-block mr-1 h-4" :src="token" />
                    {{ bet.amount }}
                  </span>
                </td>
                <td class="text-center" data-name="status: ">
                  <div class="badge badge-primary">{{ bet.status }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="btn-group mt-6 mx-auto" v-if="allPages !== 1">
          <button
            class="btn"
            v-for="i in allPages"
            :key="i"
            @click="currPage(i)"
            :class="{ 'btn-active': i === pageNumber }"
          >
            {{ i }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

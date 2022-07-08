<script setup lang="ts">
import { onMounted, ref, computed, inject } from "vue";
import moment from "moment";
//icons
import token from "../assets/koa-token.png";
import { CreditCardIcon } from "@heroicons/vue/outline";
//composables
import { fakeBets } from "../composables/Bets";
import router from "../router";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

onMounted(() => {
  document.querySelector("main")?.scrollTo(0, 0);
});

const { isModalAuthVisible } = inject<any>("auth");
const { userBets } = inject<any>("bets");

const bets = computed(() => {
  if (authStore.isAuth && userBets.value.length !== 0) {
    return userBets.value;
  }
  return fakeBets;
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

const test = () => {
  if (!paginateItems.value.length) {
    pageNumber.value = 1;
  }
};

const startbetting = () => {
  if (!authStore.isAuth) {
    isModalAuthVisible.value = true;
    return;
  }
  router.push({ name: "mma" });
};
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component
          :is="CreditCardIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">My Bets</h1>
      </div>
      <!-- <select class="select select-bordered select-sm max-w-xs" value="All">
        <option selected="selected">All</option>
        <option>Settled</option>
      </select> -->
      <select
        class="select select-bordered select-sm max-w-xs"
        :class="{ blur: !authStore.isAuth }"
        :disabled="!authStore.isAuth"
        v-model="currEntries"
        @change="test"
      >
        <option v-for="entrie in showEntries" :key="entrie" :value="entrie">
          {{ entrie }}
        </option>
      </select>
    </div>
  </div>
  <div class="relative my-6">
    <div
      class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
      v-if="!authStore.isAuth"
    >
      <button class="btn btn-warning modal-button" @click="startbetting">
        start betting
      </button>
    </div>
    <div
      class="card shadow-lg compact side bg-base-100 p-3 w-full"
      :class="{ 'blur-md': !authStore.isAuth }"
    >
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
              <tr v-for="bet in paginateItems" :key="bet.id">
                <td data-name="Event: ">
                  <div class="whitespace-normal">
                    <strong>{{ bet.name }}</strong>
                    <p>{{ moment(bet.dateTime).format("MMMM DD, YYYY") }}</p>
                    <p class="text-primary">Winner: {{ bet.winner.name }}</p>
                  </div>
                </td>
                <td class="text-center" data-name="amount: ">
                  <!-- <div class="badge badge-outline">
                    
                  </div> -->
                  <span>
                    <img class="inline-block mr-1 h-4" :src="token" />
                    {{ bet.cash }}
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

<style scoped>
@media screen and (max-width: 576px) {
  thead {
    display: none;
  }
  td {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* justify-content: space-between; */
  }
  td::before {
    content: attr(data-name);
    color: white;
    font-weight: bold;
    text-transform: capitalize;
  }
}
</style>

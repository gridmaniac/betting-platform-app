<script setup>
import { onMounted, ref, computed, inject } from "vue";
import moment from "moment";
//icons
import token from "../assets/koa-token.png";
import { CreditCardIcon } from "@heroicons/vue/outline";
//composables
import { fakeBets } from "../composables/Bets";
import router from "../router";

// localStorage.clear()

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});

const { isAuth, isModalAuthVisible } = inject("auth");
const { userBets } = inject("bets");

const bets = computed(() => {
  if (isAuth.value && userBets.value.length !== 0) {
    return userBets.value;
  }
  return fakeBets;
});
console.log(bets.value);

const currEntries = ref(4);
const pageNumber = ref(1);
const showEntries = [4, 8, 12, 16, 20];

const allItems = bets.value.length;
// const startOnPage = computed(() => {
//   return (pageNumber.value - 1) * currEntries.value + 1;
// });
// const endOnPage = computed(() => {
//   const result = startOnPage.value + currEntries.value - 1;
//   if (result >= allItems) {
//     return allItems;
//   }
//   return result;
// });
const allPages = computed(() => {
  return Math.ceil(allItems / currEntries.value);
});
// pagination funct

const currPage = (number) => {
  pageNumber.value = number;
};

const paginateItems = computed(() => {
  let from = (pageNumber.value - 1) * currEntries.value;
  let to = from + currEntries.value;
  return bets.value.slice(from, to);
});

const test = () => {
  if (!paginateItems.value.length) {
    pageNumber.value = 1;
  }
};

const startbetting = () => {
  if (!isAuth.value) {
    isModalAuthVisible.value = true;
    return;
  }
  router.push({ name: "events" });
};
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
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
        :class="{ blur: !isAuth || userBets.length === 0 }"
        :disabled="!isAuth || userBets.length === 0"
        v-model="currEntries"
        @change="test"
      >
        <option v-for="entrie in showEntries" :value="entrie">
          {{ entrie }}
        </option>
      </select>
    </div>
  </div>
  <div class="relative max-w-6xl mx-2 my-6 sm:m-6">
    <div
      class="absolute inset-0 w-full h-full flex justify-center items-center z-50"
      v-if="!isAuth || userBets.length === 0"
    >
      <button class="btn btn-warning modal-button" @click="startbetting">
        start betting
      </button>
    </div>
    <div
      class="card shadow-lg compact side bg-base-100 p-3 w-full"
      :class="{ 'blur-md': !isAuth || userBets.length === 0 }"
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
              <tr v-for="bet in paginateItems">
                <td data-name="Event: ">
                  <div class="whitespace-normal">
                    <strong>{{ bet.name }}</strong>
                    <p>{{ moment(bet.dateTime).format("MMMM DD, YYYY") }}</p>
                    <p class="text-primary">
                      Winner: {{ bet.winner.firstName }}
                      {{ bet.winner.lastName }}
                    </p>
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
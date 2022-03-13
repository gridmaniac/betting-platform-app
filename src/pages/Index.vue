<script setup>
import { ref, onMounted } from "vue";
import Event from "../components/Event.vue";
import token from "../assets/koa-token.png";

import fighter from "../assets/Joe_Stevenson_500x325.png";
import fighter2 from "../assets/Conor-McGregor.png";
import fighter3 from "../assets/Bobby Green.png";
import fighter4 from "../assets/Islam Makhachev.png";
import fighter5 from "../assets/Al Iaquinta.png";
import fighter6 from "../assets/Nasrat Haqparast.png";
import fighter7 from "../assets/Rafael Fiziev.png";

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});

const events = ref([
  {
    home: "Joe Stevenson",
    away: "Conor McGregor",
    homeImg: fighter,
    awayImg: fighter2,
    status: "1 - 0",
  },
  {
    home: "Bobby Green",
    away: "Islam Makhachev",
    homeImg: fighter3,
    awayImg: fighter4,
    status: "upcoming",
  },
  {
    home: "Al Iaquinta",
    away: "Nasrat Haqparast",
    homeImg: fighter5,
    awayImg: fighter6,
    status: "canceled",
  },
  {
    home: "Nasrat Haqparast",
    away: "Rafael Fiziev",
    homeImg: fighter6,
    awayImg: fighter7,
    status: "upcoming",
  },
  {
    home: "Joe Stevenson",
    away: "Conor McGregor",
    homeImg: fighter,
    awayImg: fighter2,
    status: "upcoming",
  },
  {
    home: "Bobby Green",
    away: "Islam Makhachev",
    homeImg: fighter3,
    awayImg: fighter4,
    status: "upcoming",
  },
  {
    home: "Al Iaquinta",
    away: "Nasrat Haqparast",
    homeImg: fighter5,
    awayImg: fighter6,
    status: "upcoming",
  },
  {
    home: "Nasrat Haqparast",
    away: "Rafael Fiziev",
    homeImg: fighter6,
    awayImg: fighter7,
    status: "upcoming",
  },
]);
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <h1 class="font-bold text-2xl text-primary">Events</h1>
      </div>

      <select class="select select-bordered select-sm max-w-xs" value="UFC">
        <option>Choose promotion</option>
        <option selected="selected">UFC</option>
        <option>CFC</option>
      </select>
    </div>
  </div>

  <div
    tabindex="0"
    class="collapse shadow-xl bg-base-100 mx-2 my-6 sm:m-6 rounded-box collapse-arrow max-w-6xl"
  >
    <input type="checkbox" checked />
    <div class="collapse-title" style="background-color: #000">
      <h2 class="text-xl font-medium">UFC Fight Night: Kattar vs. Chikadze</h2>
      <p class="pb-1">February 27, 2022</p>
    </div>
    <div class="collapse-content" style="background-color: #000">
      <table class="table table-zebra table-compact w-full">
        <thead>
          <tr>
            <th class="text-left sm:text-center">
              <div class="badge badge-ghost">7:30 PM</div>
            </th>

            <th align="center">Winner</th>
          </tr>
        </thead>
        <tbody>
          <Event v-for="(x, i) in events" :key="i" :item="x" />
        </tbody>
      </table>
    </div>
  </div>

  <div
    tabindex="0"
    class="collapse shadow-xl bg-base-100 mx-2 my-6 sm:m-6 rounded-box collapse-arrow max-w-6xl"
  >
    <input type="checkbox" />
    <div class="collapse-title" style="background-color: #000">
      <h2 class="text-xl font-medium">UFC Fight Night: Kattar vs. Chikadze</h2>
      <p class="pb-1">February 27, 2022</p>
    </div>
    <div class="collapse-content" style="background-color: #000">
      <table class="table table-zebra table-compact w-full">
        <thead>
          <tr>
            <th class="text-left sm:text-center">
              <div class="badge badge-ghost">7:30 PM</div>
            </th>

            <th align="center">Winner</th>
          </tr>
        </thead>
        <tbody>
          <Event v-for="(x, i) in events" :key="i" :item="x" />
        </tbody>
      </table>
    </div>
  </div>

  <div
    tabindex="0"
    class="collapse shadow-xl bg-base-100 mx-2 my-6 sm:m-6 rounded-box collapse-arrow max-w-6xl"
  >
    <input type="checkbox" />
    <div class="collapse-title" style="background-color: #000">
      <h2 class="text-xl font-medium">UFC Fight Night: Kattar vs. Chikadze</h2>
      <p class="pb-1">February 27, 2022</p>
    </div>
    <div class="collapse-content" style="background-color: #000">
      <table class="table table-zebra table-compact w-full">
        <thead>
          <tr>
            <th class="text-left sm:text-center">
              <div class="badge badge-ghost">7:30 PM</div>
            </th>

            <th align="center">Winner</th>
          </tr>
        </thead>
        <tbody>
          <Event v-for="(x, i) in events" :key="i" :item="x" />
        </tbody>
      </table>
    </div>
  </div>

  <!-- <div class="card shadow-xl bg-base-100 mx-0 p-0 sm:p-6 sm:m-6 max-w-6xl">
      <div class="card-body p-0">
        <h2 class="card-title px-6 sm:px-0">
          UFC Fight Night: Kattar vs. Chikadze
        </h2>
        <p class="px-6 sm:px-0">February 27, 2022</p>
        <table class="table table-zebra table-compact">
          <thead>
            <tr>
              <th class="text-left sm:text-center">
                <div class="badge badge-ghost">7:30 PM</div>
              </th>

              <th align="center">Winner</th>
            </tr>
          </thead>
          <tbody>
            <Event v-for="(x, i) in events" :key="i" :item="x" />
          </tbody>
        </table>
      </div>
    </div> -->

  <!-- <label
        for="my-drawer-2"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >open menu</label
      > -->
  <!-- <div class="hidden text-xs text-center lg:block">
        Menu is always open on desktop size. <br />Resize the browser to see
        toggle button on mobile size
      </div>
      <div class="text-xs text-center lg:hidden">
        Menu can be toggled on mobile size. <br />Resize the browser to see
        fixed sidebar on desktop size
      </div> -->
</template>

<style scoped></style>

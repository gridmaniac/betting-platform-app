<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});
</script>

<template>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block w-6 h-6 mr-2 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <h1 class="font-bold text-2xl text-primary">My Bets</h1>
      </div>

      <select class="select select-bordered select-sm max-w-xs" value="All">
        <option selected="selected">All</option>
        <option>Settled</option>
      </select>
    </div>
  </div>

  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 my-6 sm:m-6 max-w-6xl"
  >
    <div class="flex justify-between items-center">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Event</th>
            <th align="center">Odd</th>
            <th align="center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="whitespace-normal">
                <strong>UFC Fight Night: Kattar vs. Chikadze</strong>
                <p>Feb 27, 2022 / 9:30 PM</p>
                <p class="text-primary">Winner: Joe Stevenson</p>
              </div>
            </td>
            <td class="text-center">
              <div class="badge badge-outline">3.51</div>
            </td>
            <td class="text-center">
              <div class="badge badge-primary">Active</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="whitespace-normal">
                <strong>UFC Fight Night: Kattar vs. Chikadze</strong>
                <p>Feb 27, 2022 / 9:30 PM</p>
                <p class="text-primary">Winner: Joe Stevenson</p>
              </div>
            </td>
            <td class="text-center">
              <div class="badge badge-outline">3.51</div>
            </td>
            <td class="text-center">
              <div class="badge badge-success">Settled</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="whitespace-normal">
                <strong>UFC Fight Night: Kattar vs. Chikadze</strong>
                <p>Feb 27, 2022 / 9:30 PM</p>
                <p class="text-primary">Winner: Joe Stevenson</p>
              </div>
            </td>
            <td class="text-center">
              <div class="badge badge-outline">3.51</div>
            </td>
            <td class="text-center">
              <div class="badge badge-success">Settled</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="whitespace-normal">
                <strong>UFC Fight Night: Kattar vs. Chikadze</strong>
                <p>Feb 27, 2022 / 9:30 PM</p>
                <p class="text-primary">Winner: Joe Stevenson</p>
              </div>
            </td>
            <td class="text-center">
              <div class="badge badge-outline">3.51</div>
            </td>
            <td class="text-center">
              <div class="badge badge-success">Settled</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-group mt-6 mx-auto">
      <button class="btn btn-active">1</button>
      <button class="btn">2</button>
      <button class="btn">3</button>
      <button class="btn">4</button>
    </div>
  </div>
</template>

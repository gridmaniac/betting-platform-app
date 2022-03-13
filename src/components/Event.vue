<script setup>
import token from "../assets/koa-token.png";
import fighter from "../assets/Joe_Stevenson_500x325.png";
import fighter2 from "../assets/Conor-McGregor.png";

defineProps({
  item: null,
});
</script>

<template>
  <tr>
    <td>
      <div class="flex items-start sm:items-center flex-col sm:flex-row">
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img :src="item.homeImg" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">{{ item.home }}</div>
            <div class="text-sm opacity-50">United States</div>
          </div>
        </div>
        <!-- <div class="text-sm text-center">19:30</div> -->
        <div
          v-if="item.status == 'canceled'"
          class="badge badge-accent hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div
          v-else-if="item.status == 'upcoming'"
          class="badge badge-ghost hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div v-else class="badge badge-secondary hidden sm:inline-flex">
          {{ item.status }}
        </div>
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img :src="item.awayImg" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">{{ item.away }}</div>
            <div class="text-sm opacity-50">Ireland</div>
          </div>
        </div>
      </div>
    </td>
    <td>
      <div
        class="flex justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 flex-col sm:flex-row"
      >
        <Modal>
          <template #activator="{ on }"> </template>
        </Modal>
        <label
          v-if="item.status == 'upcoming'"
          for="my-modal"
          class="btn btn-active modal-button"
          >2.85</label
        >
        <label v-else for="my-modal" class="btn btn-active btn-disabled"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            /></svg
        ></label>
        <label
          v-if="item.status == 'upcoming'"
          for="my-modal"
          class="btn btn-active modal-button"
          >2.85</label
        >
        <label v-else for="my-modal" class="btn btn-active btn-disabled"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </label>
      </div>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <div class="card shadow-lg compact side bg-base-100">
            <div class="justify-between hidden sm:flex">
              <div class="flex items-center space-x-3">
                <div>
                  <div class="avatar">
                    <div class="rounded-full w-14 h-14 shadow">
                      <img :src="fighter" />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 class="card-title">Joe Stevenson</h2>
                  <p class="text-base-content text-opacity-40">United States</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="text-right">
                  <h2 class="card-title">Conor McGregor</h2>
                  <p class="text-base-content text-opacity-40">Ireland</p>
                </div>
                <div>
                  <div class="avatar">
                    <div class="rounded-full w-14 h-14 shadow">
                      <img :src="fighter2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 class="card-title justify-start sm:justify-center">
              UFC Fight Night: Kattar vs. Chikadze
            </h2>
            <p class="text-left sm:text-center">February 27, 2022</p>
            <p class="text-base-content text-opacity-40">Winner</p>
            <p
              class="text-base-content text-bold flex justify-between items-center"
            >
              Joe Stevenson <span class="text-sm">9:30 PM</span>
              <span class="text-white font-bold">3.12</span>
            </p>
            <div class="divider"></div>
            <div class="form-control">
              <label class="input-group input-group-md justify-end">
                <input
                  type="text"
                  value="150 000.00"
                  class="input input-bordered input-lg"
                />
                <span><img class="flex-0 mr-1 h-6" :src="token" /></span>
              </label>
            </div>
            <div class="text-base-content text-right pr-1 mt-1 text-sm">
              Potential win: <span class="font-bold">468 000 KOA</span>
            </div>
          </div>
          <div class="modal-action">
            <label for="my-modal" class="btn btn-primary">Place a bet</label>
            <label for="my-modal" class="btn">Close</label>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

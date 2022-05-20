<script setup>
import { CreditCardIcon } from "@heroicons/vue/outline";
import { inject, onMounted } from "vue";
import coin from "../assets/koa-token.png";

const { isAuth, isModalAuthVisible } = inject("auth")

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});
</script>

<template>

  <div class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <component :is="CreditCardIcon" class="inline-block w-6 h-6 mr-2 stroke-current" />
        <h1 class="font-bold text-2xl text-primary">Wallet</h1>
      </div>
    </div>
  </div>
  <div class="relative">
    <div class="absolute inset-0 w-full h-full flex justify-center items-center z-50" v-if="!isAuth">
      <button class="btn btn-warning modal-button" @click="isLogin = true, isModalAuthVisible = true">
        Connect to wallet
      </button>
    </div>
    <div :class="{ 'blur-md': !isAuth }">
      <div class="flex flex-col xl:flex-row mx-2 my-6 sm:m-6 max-w-6xl">
        <div class="card shadow-lg compact side bg-base-100 p-3 mb-6 xl:mb-0 mr-0 xl:mr-6 flex-1">
          <div>
            <span class="font-bold">Connected:</span>
            <p class="text-primary">0xf6CDa9031f6aae3d4dc4310364699f06F51B989B</p>
          </div>
          <div class="form-control mt-3">
            <div class="input-group">
              <button class="btn btn-ghost btn-lg hidden sm:block">100K</button>
              <button class="btn btn-ghost btn-lg hidden sm:block">1M</button>
              <input type="text" placeholder="0.000000"
                class="input input-bordered input-md sm:input-lg flex-1 text-right" />
              <button class="btn btn-outline btn-md sm:btn-lg w-auto sm:w-56">
                Deposit
              </button>
            </div>
          </div>
          <div class="form-control mt-3">
            <div class="input-group">
              <input type="text" placeholder="0.000000" class="input input-bordered flex-1 text-right" />
              <button class="btn btn-outline w-auto sm:w-56">Withdraw</button>
            </div>
          </div>
        </div>
        <div class="shadow stats stats-vertical">
          <div class="stat">
            <div class="stat-title">Balance</div>
            <div class="stat-value">
              120 000 000 <span class="text-primary">KOA</span>
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">In Bets</div>
            <div class="stat-value">
              150 000 <span class="text-primary">KOA</span>
            </div>
            <div class="stat-desc">Potential win: 468 000 KOA</div>
          </div>
        </div>
      </div>

      <div class="card shadow-lg compact side bg-base-100 p-3 mx-2 my-6 sm:m-6 max-w-6xl">
        <div class="flex justify-between items-center">
          <div class="overflow-x-auto w-full">
            <table class="table table-zebra table-compact w-full">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th align="center">Tx</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Deposit</td>
                  <td>
                    <div class="flex items-center">
                      <img class="inline-block mr-1 h-4" :src="coin" />121 000
                      000.00
                    </div>
                  </td>
                  <td class="text-center">
                    <div class="btn btn-ghost btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-4 h-4 stroke-current" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Stake</td>
                  <td>
                    <div class="flex items-center">
                      <img class="inline-block mr-1 h-4" :src="coin" />150 000.00
                    </div>
                  </td>
                  <td class="text-center">
                    <div class="btn btn-ghost btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-4 h-4 stroke-current" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

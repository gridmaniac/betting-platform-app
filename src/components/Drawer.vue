<script setup>
import token from "../assets/koa-token.png";
import partner1 from "../assets/partner-1.png";
import partner2 from "../assets/partner-2.png";
import partner3 from "../assets/partner-3.png";
import partner4 from "../assets/partner-4.png";

const emit = defineEmits(["navigate"]);
const navigate = () => {
  emit("navigate");
};
</script>

<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <aside
      class="flex flex-col border-r border-base-200 bg-base-100 text-base-content w-80"
    >
      <div
        class="sticky inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b block border-base-200 bg-base-100"
      >
        <div class="mx-auto navbar max-w-none">
          <div class="flex items-center flex-none">
            <a
              href="/"
              aria-label="Homepage"
              class="px-2 flex-0 btn btn-ghost nuxt-link-active mr-1"
              ><div
                class="inline-flex items-center text-lg font-title font-bold text-primary"
              >
                <img class="w-9 mr-2" :src="token" />
                <span>KOA</span
                ><span class="uppercase text-base-content">COMBAT</span>
              </div></a
            >
          </div>
          <a rel="nofollow" class="font-mono text-xs opacity-50"
            ><div>betting platform</div></a
          >
        </div>
      </div>
      <div>
        <ul class="menu flex flex-col p-4 pt-2 compact">
          <!-- <li class="mt-4 menu-title"><span> Official Partner of </span></li>
          <li>
            <div class="flex p-2">
              <img class="inline-block h-10" :src="partner1" />
              <img class="inline-block h-10" :src="partner2" />
              <img class="inline-block h-10" :src="partner3" />
              <img class="inline-block h-10" :src="partner4" />
            </div>
          </li>
          <div class="divider"></div> -->
          <li class="mt-4 menu-title"><span> Tools </span></li>
          <li>
            <router-link to="/" @click="navigate" class="capitalize"
              ><svg
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

              Events
            </router-link>
          </li>
          <li>
            <router-link to="/my-bets" @click="navigate" class="capitalize">
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

              My Bets
            </router-link>
          </li>
          <li>
            <router-link to="wallet" @click="navigate" class="capitalize">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>

              Wallet
            </router-link>
          </li>
        </ul>
        <ul class="menu flex flex-col p-4 pt-0 compact">
          <li class="menu-title"><span> Featured </span></li>
          <li class="">
            <router-link to="/news" @click="navigate" class="capitalize">
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
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>

              News
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

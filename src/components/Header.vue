<script setup>
import token from "../assets/koa-token.png";
</script>

<template>
  <div
    class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sticky top-0 z-50"
  >
    <div
      class="sticky inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out block sm:hidden"
    >
      <div class="mx-auto navbar max-w-none">
        <div class="flex items-center flex-none">
          <a
            href="/"
            aria-label="Homepage"
            class="px-2 flex-0 btn btn-ghost nuxt-link-active"
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
    <div class="flex-1 px-2 mx-2 hidden sm:inline-block">
      <!-- <button class="btn btn-secondary btn-sm flex items-center">
        <img class="flex-0 mr-1 h-4" :src="token" /><span>120 000 000</span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-1 h-4 w-4 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button> -->
      <button class="btn btn-sm btn-success btn-outline">
        <img class="flex-0 mr-1 h-4" :src="token" />DEPOSIT
      </button>
      <!-- <div class="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Documents</a>
              </li>
              <li>Add Document</li>
            </ul>
          </div> -->
    </div>
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div class="flex items-stretch">
        <!-- <a class="btn btn-ghost btn-sm rounded-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 mr-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Connect Wallet
            </a> -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost rounded-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block w-5 mr-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Connect Wallet
          </div>
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                ><img
                  class="mr-3"
                  src="https://sportsbet.imgix.net/logos/metamask.svg?auto=compress%2Cformat&blur=200&px=16&ixlib=react-9.0.3"
                  width="24"
                  height="24"
                />Metamask</a
              >
            </li>
            <!-- <li>
            <a>Item 2</a>
          </li> 
          <li>
            <a>Item 3</a>
          </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-none">
      <!-- <label
        for="my-drawer-2"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >open menu</label
      > -->

      <label class="btn btn-square btn-ghost lg:hidden" for="my-drawer-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current drawer-button"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
  </div>
</template>

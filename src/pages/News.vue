<script setup>
import { onMounted } from "vue";
import News from "../components/News.vue";
const news = [
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/w_580,h_480,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2FVegas49-WeighIn-2022-02-25_CU-0094_0d244879-86a7-46f4-8741-e44b51eeacef.jpg",
  },
  {
    imageUrl:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,w_268,h_167,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2022%2F02%2F10-Cirkunov-v-Turman-2022-02-26_CU-0250_1142bbab-3787-4497-942b-2e36a600ace6-850x560.jpg",
  },
];

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
        <h1 class="font-bold text-2xl text-primary">News</h1>
      </div>
    </div>
  </div>
  <div
    class="m-6 mx-2 sm:mx-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 max-w-6xl"
  >
    <News v-for="(x, i) in news" :key="i" :image="x.imageUrl" />
  </div>
</template>

import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
// store
import { useAuthStore } from "./authStore";
// models
import type { IUserBet, IBet } from "@/models/wallet";
// http
import { fecthBet, fetchBets } from "@/http/betApi";

export const useBetsStore = defineStore("bets", () => {
  // watch to user auth
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);
  if (isAuth.value) {
    console.log("bets ready");
    getUserBets();
  } else {
    console.log("bets not ready");
  }
  watch(isAuth, () => {
    if (isAuth.value) {
      console.log("bets can be connected");
    } else {
      console.log("bets disconnected");
    }
  });
  // bets store logic
  const bets = ref<IBet[]>([]);

  async function getUserBets() {
    const { data } = await fetchBets();
    bets.value = data;
  }

  async function createBet(bet: IUserBet) {
    const { data } = await fecthBet(bet);
    console.log(data);

    return data;
  }

  return {
    bets,
    // function
    createBet,
  };
});

import type { IBet } from "@/models/wallet";
import { $host } from "./index";
import { fetchBetUrl } from "@/models/http";

function getAuth() {
  const userStorage = localStorage.getItem("header");
  return userStorage !== null ? JSON.parse(userStorage) : null;
}

export const fetchBets = async (amount: number) => {
  const { data } = await $host.post(fetchBetUrl, { amount }, getAuth());
  return data;
};

export const createBet = async (bet: IBet) => {
  const { data } = await $host.post(fetchBetUrl, { bet }, getAuth());
  return data;
};

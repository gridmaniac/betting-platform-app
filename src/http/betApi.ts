import { $host, getAuth } from "./index";
import { fetchBetUrl } from "@/models/http";
import type { IUserBet } from "@/models/wallet";

// fecth all user bets
export const fetchBets = async () => {
  const { data } = await $host.get(fetchBetUrl, getAuth());
  return data;
};

// create bet from user
export const fecthBet = async (bet: IUserBet) => {
  const { data } = await $host.post(fetchBetUrl, bet, getAuth());
  return data;
};

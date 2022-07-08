import { $host, getAuth} from "./index";
import { fetchBetUrl } from "@/models/http";
import type { IUserBet } from "@/models/wallet";

export const fetchBets = async () => {
  const { data } = await $host.get(fetchBetUrl, getAuth());
  return data;
};

// create bet from user
export const fecthBet = async (bet: IUserBet) => {
  const newBet = {
    amount: bet.amount,
    type: bet.type,
    eventId: bet.eventId.toString().split(":")[2],
    winnerId: bet.winnerId.toString().split(":")[2]
  }
  
  const { data } = await $host.post(fetchBetUrl, bet, getAuth());
  return data;
};

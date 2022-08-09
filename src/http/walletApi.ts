import { $host, getAuth } from ".";
import { ERoutes } from "@/models/apiModels";
import type { IUserBet } from "@/models/walletModels";

export const fetchWallet = async () => {
  const { data } = await $host.get(ERoutes.Wallet, getAuth());
  return data;
};

// set user wallet address
export const setUserAddress = async (address: string) => {
  const { data } = await $host.patch(
    ERoutes.WalletAddress,
    { address },
    getAuth()
  );
  return data;
};

// set user wallet address
export const withdrawForUser = async (amount: number) => {
  const { data } = await $host.post(
    ERoutes.WalletWithdraw,
    { amount },
    getAuth()
  );
  return data;
};

// fecth all user bets
export const fetchBets = async () => {
  const { data } = await $host.get(ERoutes.Bets, getAuth());
  return data;
};

// create bet from user
export const setBet = async (bet: IUserBet) => {
  const { data } = await $host.post(ERoutes.Bets, bet, getAuth());
  return data;
};

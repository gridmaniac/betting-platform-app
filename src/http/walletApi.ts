import { $host, getAuth } from "./index";
import { fetchWalletApi, withdrawUrl, addressUrl } from "@/models/http";

export const withdraw = async (amount: number) => {
  const { data } = await $host.post(withdrawUrl, { amount }, getAuth());
  return data;
};

export const fetchWallet = async () => {
  const { data } = await $host.get(fetchWalletApi, getAuth());
  return data;
};

export const setMyAddress = async (address: string) => {
  const { data } = await $host.patch(addressUrl, { address }, getAuth());
  return data;
};

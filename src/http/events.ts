import { $host } from "./index";
import type { TSportType } from "@/models/season";

export const fetchSeasons = async (season: TSportType) => {
  try {
    const { data } = await $host.get(`/api/v1/seasons/${season}`);
    return data;
  } catch (error: any) {
    return { message: "somthing wrong" };
  }
};

export const fetchEvents = async (id: string) => {
  try {
    const { data } = await $host.get(`/api/v1/events/${id}`);
    return data;
  } catch (error: any) {
    return { message: "somthing wrong" };
  }
};

export const fetchWallet = async () => {
  const userStorage = localStorage.getItem("user")
  const user = userStorage !== null ? JSON.parse(userStorage) : null;
  const { data } = await $host.get("/api/v1/wallet", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return data;
};

export const setMyAddress = async (address: string) => {
  const userStorage = localStorage.getItem("user")
  const user = userStorage !== null ? JSON.parse(userStorage) : null;
  const { data } = await $host.patch(
    "/api/v1/wallet/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return data;
};

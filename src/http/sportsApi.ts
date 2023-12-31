import { $host } from ".";
import { ERoutes } from "@/models/apiModels";
import type { TSportType } from "@/models/sportModel";

export const fetchSeasons = async (sportType: TSportType) => {
  const response = await $host.get(ERoutes.Seasons + sportType);
  return response;
};

export const fetchEvents = async (id: string, isUpcoming: boolean) => {
  const { data } = await $host.get(ERoutes.Events + id, {
    params: { isUpcoming },
  });
  return data;
};

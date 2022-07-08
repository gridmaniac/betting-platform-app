import { $host } from "./index";
import type { TSportType } from "@/models/season";
import { fetchSeasonsUrl, fetchEventsUrl } from "@/models/http";

export const fetchSeasons = async (season: TSportType) => {
  const { data } = await $host.get(fetchSeasonsUrl + season);
  return data;
};

export const fetchEvents = async (id: string) => {
  const { data } = await $host.get(fetchEventsUrl + id);
  return data;
};

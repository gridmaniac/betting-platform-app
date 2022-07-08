import { $host } from "./index";
import type { TSportType } from "@/models/season";
import { fetchSeasonsUrl, fetchEventsUrl } from "@/models/http";

// fetch all seasons
export const fetchSeasons = async (season: TSportType) => {
  const { data } = await $host.get(fetchSeasonsUrl + season);
  return data;
};

// fetch all events in seascon
export const fetchEvents = async (id: string) => {
  const { data } = await $host.get(fetchEventsUrl + id);
  return data;
};

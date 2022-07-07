import type { ISeason } from "@/models/season";
import moment from "moment";

export const diffSeasons = (seasons: ISeason[]) => {
  const completed: ISeason[] = [];
  const upcoming: ISeason[] = [];
  seasons.filter((x) => {
    const a = moment().format();
    const b = moment(x.startDate).format();
    const result = moment(b).isBefore(moment(a));
    if (result) {
      completed.push(x);
      return x;
    }
    upcoming.push(x);
    return x;
  });
  return { completed, upcoming };
};

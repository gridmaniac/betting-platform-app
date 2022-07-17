import type { ISeason } from "@/models/sportModel";
import moment from "moment";

export function checkData(seasons: ISeason[]) {
  const completed: ISeason[] = [];
  const upcoming: ISeason[] = [];
  const currentTime = moment().format();
  seasons.forEach((season) => {
    const seasonTime = moment(season.startDate).format();
    if (currentTime > seasonTime) {
      completed.unshift(season);
      return;
    }
    upcoming.push(season);
  });
  return { upcoming, completed };
}

export const balanceFormat = (number: number) => {
  const num = new Intl.NumberFormat("ru-RU").format(number);
  return num;
};
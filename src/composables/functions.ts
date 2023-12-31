import type { ISeason } from "@/models/sportModel";
import moment from "moment";

export function checkData(seasons: ISeason[]) {
  const completed: ISeason[] = [];
  const upcoming: ISeason[] = [];
  const currentDate = moment().utc();
  seasons.forEach((season) => {
    const startDate = moment(season.startDate).utc();
    const endDate = moment(season.endDate).utc();
    if (moment(currentDate).isBefore(endDate)) {
      upcoming.push(season);
    }
    if (moment(currentDate).isAfter(startDate)) {
      completed.unshift(season);
    }
  });
  return { upcoming, completed };
}

export const balanceTokenFormat = (number: string) => {
  const num = number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return num.split(".")[0];
};

export const balanceEthFormat = (number: string) => {
  const value = parseFloat(number).toFixed(9);
  const num = parseFloat(value);
  return num;
};

export const fakeBets = [
  {
    name: "UFC 275: Teixeira vs. Prochazka",
    dateTime: "June 11, 2022",
    winner: "Robert Whittaker",
    rate: "1.65",
    status: "Scheduled",
  },
];

export const balanceFormat = (number: number) => {
  const num = new Intl.NumberFormat("ru-RU").format(number);
  return num;
};

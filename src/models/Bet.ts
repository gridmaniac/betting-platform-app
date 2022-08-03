export interface IBet {
  amount: number;
  date: string;
  eventId: string;
  season: string;
  startTime: string;
  status: string;
  type: string;
  userId: string;
  winner: string;
  winnerId: string;
  __v: number;
  _id: string;
}

export type IBetType = "all" | "cancelled" | "settled" | "open";

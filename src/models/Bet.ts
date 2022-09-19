export interface IBet {
  sport: string;
  code: string;
  amount: string;
  profit: string;
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

export interface IBetResponse {
  data: IBet[];
}

export type IBetType = "all" | "cancelled" | "settled" | "open";

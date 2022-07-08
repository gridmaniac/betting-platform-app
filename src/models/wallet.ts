export interface ITransaction {
  amount: number;
  date: string;
  txHash: string;
  type: string;
}

export interface IModalErrorMessage {
  title: string;
  description: string;
}

export interface IUserBet {
  amount: number;
  winnerId: number;
  eventId: string;
  type: TBetType;
}

export type TBetType = "winner";

export interface IBet extends IUserBet {
  date: string;
  season: string;
  startTime: string;
  status: string;
  userId: string;
  winner: string;
  __v: number;
  _id: string;
}

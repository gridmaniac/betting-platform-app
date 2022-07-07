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

export interface IBet {
  amount: number;
  winnerId: number;
  eventId: string;
  type: TBetType;
}

export type TBetType = "winner";

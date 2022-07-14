export interface IWallet {
  address: string;
  balance: number;
  contractAddress: string;
  decimals: string;
  hotAddress: string;
  inBets: string;
  transactions: ITransaction[];
}

interface IKeyValue {
  [key: string]: string;
}

export interface ITransaction extends IKeyValue {
  amount: string;
  date: string;
  txHash: string;
  type: string;
}

export interface IUserBet {
  amount: number;
  winnerId?: string;
  eventId?: string;
  type: TBetType;
}

export type TBetType = "winner";

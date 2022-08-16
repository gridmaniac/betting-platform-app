export interface ITransaction {
  amount: string;
  code: string;
  date: string;
  txHash: string;
  type: string;
  userId: string;
  status?: string;
  address?: string;
  __v: number;
  _id: string;
}

export interface ITransactionResponse {
  data: ITransaction[];
}

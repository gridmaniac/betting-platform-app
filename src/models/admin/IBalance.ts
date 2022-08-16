export interface IBalance {
  amount: number;
  code: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface IBalanceResponse {
  data: IBalance[];
}

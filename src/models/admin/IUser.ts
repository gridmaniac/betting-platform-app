export interface IUser {
  address: string;
  email: string;
  hash: string;
  isActive: true;
  role: string;
  salt: string;
  __v: number;
  _id: string;
}

export interface IUserResponse {
  data: IUser[];
}

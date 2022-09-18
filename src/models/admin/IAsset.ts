export interface IAsset {
  code: string;
  contract: string;
  contractABI: string;
  decimals: number;
  listed: false;
  minStake: string;
  minWithdrawal: string;
  type: string;
  ethTax: string;
}

export interface IAssetResponse extends IAsset {
  __v: number;
  _id: string;
}

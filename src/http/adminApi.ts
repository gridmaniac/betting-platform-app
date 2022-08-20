import { $host, getAuth } from ".";
// types
import type { AxiosResponse } from "axios";
// routes
import { EAdminRoutes } from "@/models/apiModels";
import type { ISetting } from "@/models/admin/ISetting";
import type { IAsset, IAssetResponse } from "@/models/admin/IAsset";
import type { IUserResponse } from "@/models/admin/IUser";
import type { IBalanceResponse } from "@/models/admin/IBalance";
import type { IDeposit, IDepositResponse } from "@/models/admin/IDeposit";
import type { IBetResponse } from "@/models/Bet";

interface IGetSettings {
  data: ISetting[];
}

interface IGetAssets {
  data: IAssetResponse[];
  err?: string;
}

export default class AdminService {
  // get all settings
  static async getSettings(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.get(EAdminRoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // add new setting
  static async createSetting(
    setting: ISetting
  ): Promise<AxiosResponse<IGetSettings>> {
    return await $host
      .post(EAdminRoutes.Setting, setting, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // update choosed setting
  static async updateSetting(
    id: string,
    setting: ISetting
  ): Promise<AxiosResponse<IGetSettings>> {
    return await $host
      .put(EAdminRoutes.Setting + "/" + id, setting, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // update choosed setting
  static async deleteSetting(
    settingId: string
  ): Promise<AxiosResponse<IGetSettings>> {
    return await $host
      .delete(EAdminRoutes.Setting + "/" + settingId, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all assets
  static async getAssets(): Promise<AxiosResponse<IGetAssets>> {
    return await $host.get(EAdminRoutes.Assets, getAuth()).catch((err) => {
      return err;
    });
  }

  // create asset
  static async createAsset(asset: IAsset): Promise<AxiosResponse<IGetAssets>> {
    return await $host
      .post(EAdminRoutes.Assets, asset, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // create asset
  static async updateAsset(
    asset: IAssetResponse
  ): Promise<AxiosResponse<IGetAssets>> {
    return await $host
      .put(EAdminRoutes.Assets + "/" + asset._id, asset, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all transactions
  static async getTransactions(): Promise<AxiosResponse<ITransactionResponse>> {
    return await $host
      .get(EAdminRoutes.Transactions, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all users
  static async getUsers(): Promise<AxiosResponse<IUserResponse>> {
    return await $host.get(EAdminRoutes.Users, getAuth()).catch((err) => {
      return err;
    });
  }

  // get all bets
  static async getBets(): Promise<AxiosResponse<IBetResponse>> {
    return await $host.get(EAdminRoutes.Bets, getAuth()).catch((err) => {
      return err;
    });
  }

  // get all deposits
  static async checkDeposit(
    deposit: IDeposit
  ): Promise<AxiosResponse<IDepositResponse>> {
    return await $host
      .post(EAdminRoutes.Deposits, deposit, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all deposits
  static async getBalances(): Promise<AxiosResponse<IBalanceResponse>> {
    return await $host.get(EAdminRoutes.Balances, getAuth()).catch((err) => {
      return err;
    });
  }
}

interface ITransaction {
  amount: string;
  code: string;
  date: string;
  txHash: string;
  type: string;
  userId: string;
  __v: number;
  _id: string;
}

interface ITransactionResponse {
  data: ITransaction[];
}

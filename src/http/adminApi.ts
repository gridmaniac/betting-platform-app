import { $host, getAuth } from ".";
// types
import type { AxiosResponse } from "axios";
// routes
import { EAdminRoutes } from "@/models/apiModels";
import type { ISetting } from "@/models/admin/ISetting";
import type { IAsset, IAssetResponse } from "@/models/admin/IAsset";
import type { IUserResponse } from "@/models/admin/IUser";

interface IGetSettings {
  data: ISetting[];
}

interface IGetAssets {
  data: IAssetResponse[];
}

export default class AdminServiece {
  // get all settings
  static async getSettings(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.get(EAdminRoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // add new setting
  static async postSetting(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.post(EAdminRoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // update choosed setting
  static async updateSetting(id: number): Promise<AxiosResponse<IGetSettings>> {
    return await $host
      .put(EAdminRoutes.Setting + id, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // update choosed setting
  static async deleteSetting(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.delete(EAdminRoutes.Setting, getAuth()).catch((err) => {
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
      .post(EAdminRoutes.Assets, { asset }, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // create asset
  static async update(
    asset: IAssetResponse
  ): Promise<AxiosResponse<IGetAssets>> {
    return await $host
      .put(EAdminRoutes.Assets + asset._id, { asset }, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all transactions
  static async getTransactions(): Promise<AxiosResponse<IGetAssets>> {
    return await $host
      .get(EAdminRoutes.Transactions, getAuth())
      .catch((err) => {
        return err;
      });
  }

  // get all transactions
  static async getUsers(): Promise<AxiosResponse<IUserResponse>> {
    return await $host.get(EAdminRoutes.Users, getAuth()).catch((err) => {
      return err;
    });
  }

  // get all bets
  static async getBets(): Promise<AxiosResponse<IUserResponse>> {
    return await $host.get(EAdminRoutes.Bets, getAuth()).catch((err) => {
      return err;
    });
  }

  // get all deposits
  static async getDeposits(): Promise<AxiosResponse<IUserResponse>> {
    return await $host.post(EAdminRoutes.Deposits, getAuth()).catch((err) => {
      return err;
    });
  }
}

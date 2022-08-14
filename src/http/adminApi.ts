import { $host, getAuth } from ".";
// types
import type { AxiosResponse } from "axios";
// routes
import { ERoutes } from "@/models/apiModels";
import type { ISetting } from "@/models/admin/ISetting";
import type { IAsset } from "@/models/admin/IAsset";

interface IGetSettings {
  data: ISetting[];
}

interface IGetAssets {
  data: IAsset[];
}

export default class AdminServiece {
  // get all settings
  static async getSettings(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.get(ERoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // add new setting
  static async postSetting(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.post(ERoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // update choosed setting
  static async updateSetting(id: number): Promise<AxiosResponse<IGetSettings>> {
    return await $host.put(ERoutes.Setting + id, getAuth()).catch((err) => {
      return err;
    });
  }

  // update choosed setting
  static async deleteSetting(): Promise<AxiosResponse<IGetSettings>> {
    return await $host.delete(ERoutes.Setting, getAuth()).catch((err) => {
      return err;
    });
  }

  // get all assets
  static async getAssets(): Promise<AxiosResponse<IGetAssets>> {
    return await $host.get(ERoutes.Assets, getAuth()).catch((err) => {
      return err;
    });
  }
}

import { $host, getAuth } from ".";
import { ERoutes } from "@/models/apiModels";
import type { IUserLogin, IUserRegister } from "@/models/userModel";

export const fetchUser = async (user: IUserLogin) => {
  const { data } = await $host.post(ERoutes.Login, user);
  return data;
};

export const createUser = async (user: IUserRegister) => {
  const { data } = await $host.post(ERoutes.Signup, user);
  return data;
};

export const resetUserPassword = async (email: string) => {
  const { data } = await $host.post(ERoutes.ForgotPassword, { email });
  return data;
};

export const changeUserPassword = async (password: string) => {
  const { data } = await $host.put(
    ERoutes.ChangePassword,
    { password },
    getAuth()
  );
  return data;
};

export const confirmEmail = async (code: string) => {
  const { data } = await $host.put(ERoutes.Activate, { confirmationCode: code})
  return data;
};

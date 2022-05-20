import { $host } from "./index";

export const registrarion = async (email, password, confirmPassword) => {
  const { data } = await $host.post("api/v1/signup", {
    email,
    password,
    confirmPassword,
  });
  return data;
};

export const signIn = async (email, password) => {
  const { data } = await $host.post("api/v1/login", { email, password });
  return data;
};

export const placeBet = async (fight) => {
  return fight;
};

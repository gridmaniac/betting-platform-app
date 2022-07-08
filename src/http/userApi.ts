import { $host } from "./index";

// login
export const fetchUser = async (email: string, password: string) => {
  const { data } = await $host.post("api/v1/login", { email, password });
  return data;
};

export const createUser = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const { data } = await $host.post("api/v1/signup", {
    email,
    password,
    confirmPassword,
  });
  return data;
};

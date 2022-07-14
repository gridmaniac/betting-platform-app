import { defineStore } from "pinia";
import { ref } from "vue";
import {
  fetchUser,
  changeUserPassword,
  resetUserPassword,
  createUser,
} from "@/http/userApi";

export const useAuthStore = defineStore("authStore", () => {
  const isAuth = ref(false);
  const token = ref<string | null>();

  token.value = localStorage.getItem("token");
  if (token.value) {
    isAuth.value = true;
  }

  async function login(email: string, password: string) {
    const user = {
      email,
      password,
    };
    const response = await fetchUser(user);
    if (response.modelErrors) {
      return response;
    }

    localStorage.setItem("token", response.data);
    token.value = response.data;
    isAuth.value = true;
    return response;
  }

  async function register(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = {
      email,
      password,
      confirmPassword,
    };
    const response = await createUser(user);
    return response;
  }

  function logout() {
    isAuth.value = false;
    token.value = null;
    localStorage.removeItem("token");
  }

  async function changePassword(password: string) {
    const response = await changeUserPassword(password);
    return response;
  }

  async function resetPassword(email: string) {
    const response = await resetUserPassword(email);
    return response;
  }

  return {
    token,
    isAuth,
    login,
    register,
    logout,
    changePassword,
    resetPassword,
  };
});

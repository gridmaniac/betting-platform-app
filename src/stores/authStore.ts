import { defineStore } from "pinia";
import { nextTick, ref, watch } from "vue";
import {
  fetchUser,
  changeUserPassword,
  resetUserPassword,
  createUser,
  getProfile,
} from "@/http/userApi";

export const useAuthStore = defineStore("authStore", () => {
  const isAuth = ref(false);
  const isAdmin = ref(false);
  const userEmail = ref<string | null>();
  const token = ref<string | null>();

  token.value = localStorage.getItem("token");
  if (token.value) {
    isAuth.value = true;
    nextTick(async () => {
      getUserProfile();
    });
  }

  watch(isAuth, () => {
    if (isAuth.value) {
      getUserProfile();
    }
  });

  async function login(email: string, password: string) {
    const user = {
      email: email.toLowerCase(),
      password,
    };
    const response = await fetchUser(user);
    if (response.modelErrors) {
      return response;
    }

    localStorage.setItem("token", response.data);
    token.value = response.data;
    isAuth.value = true;
    getUserProfile();
    return response;
  }

  async function getUserProfile() {
    const profile = await getProfile();
    if (profile.role === "admin") {
      isAdmin.value = true;
    }
    if (profile.email) {
      userEmail.value = profile.email;
    }
  }

  async function register(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = {
      email: email.toLowerCase(),
      password,
      confirmPassword,
    };
    const response = await createUser(user);
    return response;
  }

  function logout() {
    isAuth.value = false;
    isAdmin.value = false;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    userEmail.value = null;
  }

  async function changePassword(password: string) {
    const response = await changeUserPassword(password);
    return response;
  }

  async function resetPassword(email: string) {
    const response = await resetUserPassword(email.toLowerCase());
    return response;
  }

  return {
    token,
    isAuth,
    isAdmin,
    login,
    register,
    logout,
    changePassword,
    resetPassword,
    userEmail,
  };
});

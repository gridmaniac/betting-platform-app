import { defineStore } from "pinia";
import { ref } from "vue";
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
  const roleStorage = localStorage.getItem("userRole");
  if (roleStorage) {
    isAdmin.value = JSON.parse(roleStorage);
  }
  userEmail.value = localStorage.getItem("userEmail");
  if (token.value) {
    isAuth.value = true;
  }

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
    localStorage.setItem("userEmail", email);
    token.value = response.data;
    isAuth.value = true;
    userEmail.value = email;
    const profile = await getProfile();
    if (profile.role) {
      isAdmin.value = true;
    }
    localStorage.setItem("userRole", JSON.stringify(isAdmin.value));
    return response;
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
    token.value = null;
    localStorage.removeItem("token");
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

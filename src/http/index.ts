import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const $host = axios.create({
  baseURL: "https://betting-platform-server-staging-asbin.ondigitalocean.app/",
});

export const getAuth = () => {
  const authStore = useAuthStore();
  return {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  };
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
  }
);

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

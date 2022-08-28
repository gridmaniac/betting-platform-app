import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAuth = () => {
  const authStore = useAuthStore();
  return {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  };
};

$host.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const authStore = useAuthStore();
      console.log("test");
      authStore.logout();
    }
  }
);

import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false);
  const header = ref();
  const user = ref({
    token: "",
  });
  if (localStorage.getItem("user")) {
    const userStorage = localStorage.getItem("user");
    user.value = userStorage !== null ? JSON.parse(userStorage) : null;
    isAuth.value = true;

    header.value = {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    };
    localStorage.setItem("header", JSON.stringify(header.value));
  }

  watch(isAuth, (x) => {
    console.log(x);
  });
  //wath
  watch(
    user,
    (userVal) => {
      localStorage.setItem("user", JSON.stringify(userVal));
    },
    {
      deep: true,
    }
  );
  // func
  const login = (token: string) => {
    user.value.token = token;
    isAuth.value = true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    isAuth.value = false;
    router.push({ name: "mma" });
  };

  return {
    user,
    isAuth,
    login,
    logout,
    header,
  };
});

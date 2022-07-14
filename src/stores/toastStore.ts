import { defineStore } from "pinia";
import { ref } from "vue";
import type { IToast } from "@/models/notificationModel";

export const useToastStore = defineStore("toastStore", () => {
  const toasts = ref<IToast[]>([]);

  const push = (toast: IToast) => {
    toast.id = +Math.random().toString().slice(2);
    toasts.value.push(toast);
    setTimeout(() => {
      remove(toast);
    }, 5000);
  };

  const remove = (toast: IToast) => {
    toasts.value = toasts.value.filter((x) => {
      if (x.id === toast.id) {
        return;
      }
      return x;
    });
  };
  return {
    toasts,
    push,
    remove,
  };
});

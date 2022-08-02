import type { IModalNotification } from "@/models/notificationModel";
import type { ICompetitor, IEvent, ISeason } from "@/models/sportModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
  const isModalAuthVisible = ref(false);
  const isModalResetPassword = ref(false);
  const isLogin = ref(true);
  const isModalNotification = ref(false);
  const isModalWithdraw = ref(false);
  const isModalConfirm = ref(false);
  const modalNotificationContent = ref<IModalNotification | null>();
  // modal bet
  const isModalBetVisible = ref(false);
  const ModalBetContent = ref<{
    event: IEvent;
    season: ISeason;
    winner: ICompetitor;
  }>();
  return {
    isModalAuthVisible,
    isModalResetPassword,
    isLogin,
    isModalNotification,
    modalNotificationContent,
    isModalWithdraw,
    isModalConfirm,
    isModalBetVisible,
    ModalBetContent,
  };
});

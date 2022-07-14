import type { IToast } from "@/models/notificationModel";

export const ToastTransaction: IToast = {
  id: 0,
  title: "",
  description: "Transaction has been processed.",
  status: "success",
};

export const ToastPasswordChange: IToast = {
  id: 0,
  title: "",
  description: "Password has been successfuly changed.",
  status: "success",
};

export const ToastBetSuccess: IToast = {
  id: 0,
  title: "",
  description: "Bet was created.",
  status: "success",
};

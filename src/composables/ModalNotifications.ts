import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";

export const ResetPassword = {
  icon: CheckCircleIcon,
  title: "Password reset",
  description: "Your temporary password was successfully sent to your email.",
};

export const RegisterSucces = {
  icon: CheckCircleIcon,
  title: "Confirm Your Email",
  description: "Thanks for signing up! We sent you a confirmation email.",
};

export const WalletError = {
  icon: ExclamationCircleIcon,
  title: "No crypto wallet",
  description: "No crypto wallet found. Please install it.",
};

export const WalletConnectError = {
  icon: ExclamationCircleIcon,
  title: "Connection error",
  description: "Something went wrong. Please try again.",
};

export const DepositError = {
  icon: ExclamationCircleIcon,
  title: "Connection error",
  description: "Something went wrong. Please try again.",
};

export const DepositSuccess = {
  icon: CheckCircleIcon,
  title: "Success",
  description: "Await for transaction to be processed.",
};

export const WithdrawMoney = {
  icon: QuestionMarkCircleIcon,
  title: "Withdrawal Request",
  description: "Please confirm your withdrawal.",
};

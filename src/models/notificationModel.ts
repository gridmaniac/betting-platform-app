export interface IModalNotification {
  icon: any;
  title: string;
  description: string;
}

export interface IToast {
  id: number;
  title: string;
  description: string;
  status: TToastStatus;
}

export type TToastStatus = "success" | "error" | "danger";

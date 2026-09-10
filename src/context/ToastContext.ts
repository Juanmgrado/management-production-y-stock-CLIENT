import { createContext } from "react";

export type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export type ToastContextValue = {
  addToast: (message: string, type?: Toast["type"]) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

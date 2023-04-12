import { AlertColor } from "@mui/material";
import { createContext } from "react";

const ToastContext = createContext<{
  toasts: {
    toast: {
      id: number;
      severity: AlertColor;
      text: string;
      isDissapering?: boolean;
    };
    expiresIn: number;
  }[];
  setToast: (severity: AlertColor, text: string) => void;
}>({
  toasts: [],
  setToast: (severity: AlertColor, text: string) => {},
});

export default ToastContext;

import { AlertColor } from "@mui/material";
import React, { useEffect, useState } from "react";
import ToastContext from "./toast-context";

const ToastProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [toasts, setToasts] = useState<
    {
      toast: { id: number; severity: AlertColor; text: string };
      expiresIn: number;
    }[]
  >([]);

  const makeToast = (severity: AlertColor, text: string) => {
    setToasts((prevState) => [
      ...prevState,
      { toast: { id: new Date().getTime(), severity, text }, expiresIn: 3 },
    ]);
  };

  useEffect(() => {
    if (toasts.length !== 0) {
      let interval = setInterval(() => {
        setToasts((prevState) =>
          prevState
            .filter((item) => item.expiresIn > 0)
            .map((item) => ({
              toast: item.toast,
              expiresIn: item.expiresIn - 0.5,
            }))
        );
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [toasts]);

  const toastCtxValue = {
    toasts: toasts,
    setToast: makeToast,
  };

  return (
    <ToastContext.Provider value={toastCtxValue}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

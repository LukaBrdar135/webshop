import { useContext } from "react";
import ToastContext from "../../../store/toast-context";
import Toast from "./Toast";
import classes from "./ToastLayout.module.css";

const ToastsLayout = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className={classes.toastPosition}>
      <div className={classes.toastLayout}>
        {toasts.map((toast) => (
          <div key={toast.toast.id}>
            <Toast
              severity={toast.toast.severity}
              text={toast.toast.text}
              isDisappearing={toast.expiresIn === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastsLayout;

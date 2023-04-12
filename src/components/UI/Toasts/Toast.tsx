import { Alert, AlertColor } from "@mui/material";
import classes from "./Toast.module.css";

const Toast: React.FC<{
  text: string;
  severity: AlertColor;
  isDisappearing?: boolean;
}> = ({ text, severity, isDisappearing = false }) => {
  return (
    <div
      className={`${classes.toast}  ${isDisappearing ? classes.toastOut : ""}`}
    >
      <Alert severity={severity}>{text}</Alert>
    </div>
  );
};

export default Toast;

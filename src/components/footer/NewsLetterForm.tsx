import classes from "./NewsLetterForm.module.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import useHttp from "../../hooks/use-http";
import { FIREBASE_URL } from "../../globals/GlobalConstants";
import { useContext } from "react";
import ToastContext from "../../store/toast-context";
import Spinner from "../UI/Spinner";

const NewsLetterForm = () => {
  const toastCtx = useContext(ToastContext);
  const { isLoading, sendRequest } = useHttp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const submitHandler: SubmitHandler<{ email: string }> = (data) => {
    const showSuccess = () => {
      toastCtx.setToast("success", "Successfully added to newsletter");
    };

    const showError = () => {
      toastCtx.setToast("warning", "Something went wrong");
    };

    sendRequest(
      {
        url: FIREBASE_URL + "newsletter.json",
        method: "POST",
        body: { email: data.email },
        headers: { "Content-Type": "application/json" },
      },
      showSuccess,
      showError
    );
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.form}>
        <MailOutlineIcon />
        <input
          type="email"
          className={classes.formInput}
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
        />
        {!isLoading && (
          <IconButton color="inherit" type="submit">
            <ArrowForwardIcon />
          </IconButton>
        )}
        {isLoading && <Spinner />}
      </div>
      <div className="errors">
        {errors.email?.type === "required" && <p>Email can not be empty</p>}
        {errors.email?.type === "pattern" && <p>Entered email is not valid</p>}
      </div>
    </form>
  );
};

export default NewsLetterForm;

import classes from "../UI/forms/Form.module.css";
import Button from "../UI/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { FIREBASE_URL } from "../../globals/GlobalConstants";
import { useContext, useEffect } from "react";
import ToastContext from "../../store/toast-context";
import useHttp from "../../hooks/use-http";
import Spinner from "../UI/Spinner";
import { AuthContext } from "../../store/auth-context";

type Inputs = {
  email: string;
  title: string;
  question: string;
};

const ContactForm: React.FC = () => {
  const toastCtx = useContext(ToastContext);
  const authCtx = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetFrom,
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    const handleResponseData = () => {
      toastCtx.setToast("success", "Question sent!");
      resetFrom({ email: authCtx.email, title: "", question: "" });
    };

    sendRequest(
      {
        url: FIREBASE_URL + "questions.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: data.email,
          title: data.title,
          question: data.question,
        },
      },
      handleResponseData,
      (error) => toastCtx.setToast("error", error.message)
    );
  };

  useEffect(() => {
    let defaultValues = {
      email: authCtx.email,
      title: "",
      question: "",
    };

    resetFrom(defaultValues);
  }, [authCtx, resetFrom]);

  return (
    <form
      className={`${classes.form} ${classes.centerForm} ${classes.formWidthL}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={classes.formHeading}>
        <h3>Ask Us a Question</h3>
      </div>
      <div className={classes.formGroup}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
        />
        {errors.email?.type === "required" && <p>Email can not be empty</p>}
        {errors.email?.type === "pattern" && <p>Email is not valid</p>}
      </div>
      <div className={classes.formGroup}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title?.type === "required" && <p>Title can not be empty</p>}
      </div>
      <div className={classes.formGroup}>
        <textarea
          placeholder="Question"
          {...register("question", { required: true })}
        ></textarea>
        {errors.question?.type === "required" && (
          <p>Question can not be empty</p>
        )}
      </div>
      <div className={classes.formActions}>
        {!isLoading ? (
          <Button design="dark" type="submit">
            Send Question
          </Button>
        ) : (
          <Spinner />
        )}
      </div>
    </form>
  );
};

export default ContactForm;

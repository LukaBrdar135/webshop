import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FIREBASE_API_KEY } from "../../../globals/GlobalConstants";
import useHttp from "../../../hooks/use-http";
import { AuthContext } from "../../../store/auth-context";
import Button from "../../UI/Button";
import classes from "../../UI/forms/Form.module.css";
import uiClasses from "../../UI/UI.module.css";
import Spinner from "../../UI/Spinner";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import GoogleIcon from "@mui/icons-material/Google";
import ToastContext from "../../../store/toast-context";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const toastCtx = useContext(ToastContext);
  const navigate = useNavigate();
  const { sendRequest, error, isLoading } = useHttp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    const getLoginInfo = (
      email: string,
      data: { idToken: string; expiresIn: number }
    ) => {
      authCtx.login(data.idToken, data.expiresIn, email);
      navigate("/");
    };

    sendRequest(
      {
        url:
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          FIREBASE_API_KEY,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      },
      getLoginInfo.bind(null, data.email)
    );
  };

  const googleLoginHandler = () => {
    setIsLoadingGoogle(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credentials = GoogleAuthProvider.credentialFromResult(result);

        if (credentials?.idToken && result.user.email) {
          authCtx.login(credentials.idToken, 0, result.user.email, true);
          navigate("/");
        }
      })
      .catch((error) => {
        toastCtx.setToast("error", error.message);
        setIsLoadingGoogle(false);
      });
  };

  return (
    <form
      className={`${classes.form} ${classes.formWidthM} ${uiClasses.padX4}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={classes.formHeading}>
        <h3>I already have an account</h3>
        <p>Sign in with your email and password</p>
      </div>
      {error && (
        <p className={uiClasses.errorText}>Invalid email or password</p>
      )}
      <div className={classes.formGroup}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email?.type === "required" && <p>Email is required</p>}
      </div>
      <div className={classes.formGroup}>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password?.type === "required" && <p>Password is required</p>}
      </div>
      <div className={classes.formActions}>
        <Button design="dark" type="submit">
          {isLoading ? (
            <Spinner size="small" centered={false} />
          ) : (
            <span>Sign in</span>
          )}
        </Button>
        <Button design="blue" type="button" onClick={googleLoginHandler}>
          {isLoadingGoogle ? (
            <Spinner size={"small"} centered={false} />
          ) : (
            <GoogleIcon />
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

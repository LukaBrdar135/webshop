import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";
import Button from "../../UI/Button";
import classes from "../../UI/forms/Form.module.css";
import uiClasses from "../../UI/UI.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { FIREBASE_API_KEY } from "../../../globals/GlobalConstants";
import useHttp from "../../../hooks/use-http";
import Spinner from "../../UI/Spinner";

type Inputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterFrom: React.FC = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
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
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          FIREBASE_API_KEY,
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: {
          displayName: data.displayName,
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      },
      getLoginInfo.bind(null, data.email)
    );
  };

  return (
    <form
      className={`${classes.form} ${classes.formWidthM} ${uiClasses.padX4}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={classes.formHeading}>
        <h3>I dont't have an account</h3>
        <p>Sign up with your email and password</p>
      </div>
      <div className={classes.formGroup}>
        <input
          type="text"
          placeholder="Display name"
          {...register("displayName", { required: true })}
        />
        {errors.displayName?.type === "required" && (
          <p>Display name is required</p>
        )}
      </div>
      <div className={classes.formGroup}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^\S+@vicert.com$/i,
          })}
        />
        {errors.email?.type === "required" && <p>Email is required</p>}
        {errors.email?.type === "pattern" && (
          <p>Email must be vicert.com email</p>
        )}
        {error && <p className={uiClasses.errorText}>Email already in use</p>}
      </div>
      <div className={classes.formGroup}>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />
        {errors.password?.type === "required" && <p>Password is required</p>}
        {errors.password?.type === "minLength" && (
          <p>Password must have at least 6 characters</p>
        )}
      </div>
      <div className={classes.formGroup}>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value: string) => {
              if (watch("password") !== value) {
                return false;
              }
            },
          })}
        />
        {errors.confirmPassword?.type === "required" && (
          <p>Confirm password is required</p>
        )}
        {errors.confirmPassword?.type === "validate" && (
          <p>Passwords do not match</p>
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Button type="submit" design="dark">
          Sign up
        </Button>
      )}
    </form>
  );
};

export default RegisterFrom;

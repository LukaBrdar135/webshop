import classes from "./AuthContainer.module.css";
import LoginForm from "./forms/LoginForm";
import RegisterFrom from "./forms/RegisterFrom";

const AuthContainer: React.FC = () => {
  return (
    <div className={classes.authContainer}>
      <LoginForm />
      <RegisterFrom />
    </div>
  );
};

export default AuthContainer;

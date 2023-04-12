import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";

const LoginButton: React.FC<{
  onLoginClick?: () => void;
  className?: string;
}> = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {authCtx.token ? (
        <div
          className={props.className}
          onClick={() => {
            authCtx.logout();
            navigate("/");
          }}
        >
          Sign Out
        </div>
      ) : (
        <Link
          className={props.className}
          to="/login"
          onClick={props?.onLoginClick}
        >
          Sign In
        </Link>
      )}
    </>
  );
};

export default LoginButton;

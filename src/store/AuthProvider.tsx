import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase";
import { AuthContext } from "./auth-context";

let logoutTimer: NodeJS.Timeout;

const addAuthToLocalStorage = (
  token: string,
  expiresIn: number,
  email: string,
  isGoogleLogin?: boolean
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiresIn", expiresIn.toString());
  localStorage.setItem("email", email);

  if (isGoogleLogin) {
    localStorage.setItem("isGoogleLogin", "1");
  }
};

const calculateExpiresInTime = (expiresIn: number) => {
  let currentTime = new Date().getTime();

  // expiresIn je u sekundama pa mu dodajem *1000 da bude u ms
  let expiresInTime = new Date(currentTime + expiresIn * 1000).getTime();

  return expiresInTime;
};

const getUserAuthFromLocalStorage = () => {
  let token = localStorage.getItem("token");
  let expiresIn = localStorage.getItem("expiresIn");
  let email = localStorage.getItem("email");
  let isGoogleLogin = localStorage.getItem("isGoogleLogin");

  if (isGoogleLogin === "1") {
    return { token, expiresIn: 0, email, isGoogleLogin: true };
  }

  if (expiresIn && +expiresIn - new Date().getTime() > 5 * 60 * 1000) {
    return { token, expiresIn, email, isGoogleLogin: false };
  }

  return { token: "", expiresIn: 0, email: "", isGoogleLogin: false };
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("email");
  localStorage.removeItem("isGoogleLogin");
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const setUserAuth = (data: {
    idToken: string;
    expiresIn: number;
    email: string;
    isGoogleLogin?: boolean;
  }) => {
    let expiresInTime = calculateExpiresInTime(+data.expiresIn);
    addAuthToLocalStorage(
      data.idToken,
      expiresInTime,
      data.email,
      data.isGoogleLogin
    );

    if (!data.isGoogleLogin) {
      logoutTimer = setTimeout(() => {
        logoutHandler(true);
      }, data.expiresIn * 1000);
    }

    setToken(data.idToken);
    setEmail(data.email);
  };

  const loginHandler = async (
    token: string,
    expiresIn: number,
    email: string,
    isGoogleLogin?: boolean
  ) => {
    setUserAuth({ idToken: token, expiresIn, email, isGoogleLogin });
  };

  const logoutHandler = useCallback(
    (calledByTimer: boolean = false) => {
      setToken("");
      setEmail("");
      clearUserFromLocalStorage();

      firebaseAuth.signOut();

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      if (calledByTimer) {
        alert("Your session has timed out please log in again.");
        navigate("/login");
      }
    },
    [navigate]
  );

  useEffect(() => {
    let { token, expiresIn, email, isGoogleLogin } =
      getUserAuthFromLocalStorage();

    if (token && email) {
      setToken(token);
      setEmail(email);

      if (!isGoogleLogin) {
        logoutTimer = setTimeout(() => {
          logoutHandler(true);
        }, +expiresIn - new Date().getTime());
      }
    }
  }, [logoutHandler]);

  const authCtx = {
    token: token,
    email: email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

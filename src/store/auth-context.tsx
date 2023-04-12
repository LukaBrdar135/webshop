import React from "react";

type ContextType = {
  token: string;
  email: string;
  login: (
    token: string,
    expiresIn: number,
    email: string,
    isGoogleLogin?: boolean
  ) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<ContextType>({
  token: "",
  email: "",
  login: (token: string, expiresIn: number, email: string) => {},
  logout: () => {},
});

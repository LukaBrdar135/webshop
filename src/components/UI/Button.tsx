import React from "react";
import MUIButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import classes from "./Button.module.css";

type Props = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  type?: "submit" | "button";
  design: "dark" | "light" | "blue" | null;
  className?: string;
};

const DarkButton = styled(MUIButton)<ButtonProps>(() => ({
  textTransform: "uppercase",
  color: "#fff",
  backgroundColor: "#000",
  borderRadius: 0,
  padding: "10px 30px",
  height: "50px",
  "&:hover": {
    backgroundColor: "#555",
  },
}));

const LightButton = styled(MUIButton)<ButtonProps>(() => ({
  textTransform: "uppercase",
  color: "#000",
  backgroundColor: "#fff",
  borderRadius: 0,
  padding: "10px 30px",
  height: "50px",
  "&:hover": {
    backgroundColor: "#ccc",
  },
}));

const BlueButton = styled(MUIButton)<ButtonProps>(() => ({
  textTransform: "uppercase",
  borderRadius: 0,
  height: "50px",
  padding: "10px 30px",
}));

const Button: React.FC<Props> = (props) => {
  let btn: React.ReactNode;
  if (props.design === "dark") {
    btn = (
      <DarkButton
        variant="contained"
        type={props.type}
        onClick={props?.onClick}
        className={props?.className}
      >
        <div className={classes.buttonContent}>{props.children}</div>
      </DarkButton>
    );
  } else if (props.design === "light") {
    btn = (
      <LightButton
        variant="contained"
        onClick={props?.onClick}
        type={props.type}
        className={props?.className}
      >
        <div className={classes.buttonContent}>{props.children}</div>
      </LightButton>
    );
  } else if (props.design === "blue") {
    btn = (
      <BlueButton
        variant="contained"
        onClick={props?.onClick}
        type={props.type}
        className={props?.className}
      >
        <div className={classes.buttonContent}>{props.children}</div>
      </BlueButton>
    );
  } else {
    btn = (
      <DarkButton
        variant="contained"
        onClick={props?.onClick}
        type={props.type}
        className={props?.className}
      >
        {props.children}
      </DarkButton>
    );
  }

  return <>{btn}</>;
};

export default Button;

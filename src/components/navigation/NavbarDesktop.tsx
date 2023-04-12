import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo";
import CartButton from "./cart/CartButton";
import LoginButton from "./login/LoginButton";
import classes from "./Navbar.module.css";

const NavbarDesktop: React.FC = () => {
  return (
    <>
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <ul className={classes["nav-links"]}>
        <li>
          <Link to={"/shop"}>shop</Link>
        </li>
        <li>
          <Link to={"/contact"}>contact</Link>
        </li>
        <li>
          <LoginButton />
        </li>
        <li>
          <CartButton />
        </li>
      </ul>
    </>
  );
};

export default NavbarDesktop;

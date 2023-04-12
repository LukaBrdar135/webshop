import React, { useCallback, useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/logo";
import CartButton from "./cart/CartButton";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import uiClasses from "../UI/UI.module.css";
import LoginButton from "./login/LoginButton";

const NavbarMobile: React.FC = () => {
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const showMenuHandler = (overrideToFalse: boolean = false) => {
    if (overrideToFalse) {
      setShowMenu(false);
    } else {
      setShowMenu((prevState) => !prevState);
    }
  };

  const handleOutSideClick = useCallback(
    (event: any) => {
      if (
        menuItemsRef.current &&
        !menuItemsRef.current.contains(event.target) &&
        showMenu
      ) {
        showMenuHandler();
      }
    },
    [showMenu]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutSideClick, true);

    return () => {
      document.removeEventListener("click", handleOutSideClick, true);
    };
  }, [handleOutSideClick]);

  return (
    <>
      <div className={classes.navItems} ref={menuItemsRef}>
        {!showMenu ? (
          <MenuIcon onClick={() => showMenuHandler()} />
        ) : (
          <CloseIcon onClick={() => showMenuHandler()} />
        )}
        <Link to={"/"} onClick={() => showMenuHandler(true)}>
          <Logo />
        </Link>
        <CartButton />
      </div>
      {showMenu && (
        <div className={classes.menuItems} ref={menuItemsRef}>
          <ul>
            <li>
              <Link
                to="/shop"
                className={uiClasses.blockCover}
                onClick={() => showMenuHandler()}
              >
                shop
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={uiClasses.blockCover}
                onClick={() => showMenuHandler()}
              >
                contact
              </Link>
            </li>
            <li>
              <LoginButton onLoginClick={showMenuHandler} />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;

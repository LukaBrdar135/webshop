import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Navbar.module.css";
import uiClasses from "../UI/UI.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/logo";
import { Link } from "react-router-dom";
import CartButton from "./cart/CartButton";
import LoginButton from "./login/LoginButton";

const Navbar: React.FC = () => {
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
    <nav className={classes.navbar}>
      <div className={uiClasses.container}>
        <div className={classes.navItems}>
          <div
            className={`${uiClasses.tabletAndLessView} ${classes.bugerMenuBtn}`}
          >
            <div className={classes.centerBtn}>
              {!showMenu ? (
                <MenuIcon onClick={() => showMenuHandler()} />
              ) : (
                <CloseIcon onClick={() => showMenuHandler()} />
              )}
            </div>
          </div>
          <Link to={"/"} onClick={() => showMenuHandler(true)}>
            <Logo />
          </Link>
          <div className={classes.menuItems}>
            <div
              className={`${classes.burgerContent} ${
                !showMenu && uiClasses.smallScreenAndMoreView
              }`}
              ref={menuItemsRef}
            >
              <div className={classes.burgerContentWrapper}>
                <div className={classes.navList}>
                  <Link
                    to="/shop"
                    className={classes.navListItem}
                    onClick={() => showMenuHandler()}
                  >
                    shop
                  </Link>
                  <Link
                    to="/contact"
                    className={classes.navListItem}
                    onClick={() => showMenuHandler()}
                  >
                    contact
                  </Link>

                  <LoginButton
                    className={classes.navListItem}
                    onLoginClick={showMenuHandler}
                  />
                </div>
              </div>
            </div>
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

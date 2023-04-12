import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../../store/cart-context";
import ShoppingBag from "../../../assets/shopping-bag.svg";
import classes from "./CartButton.module.css";
import Cart from "../../cart/Cart";
import CloseIcon from "@mui/icons-material/Close";

const CartButton: React.FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { totalAmount } = useContext(CartContext);
  const [showCart, setShowCart] = useState<boolean>(false);

  const toggleCartHandler = (overrideToFalse: boolean = false) => {
    if (overrideToFalse) {
      setShowCart(false);
    } else {
      setShowCart((prevState) => !prevState);
    }
  };

  const handleOutSideClick = useCallback(
    (event: any) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        showCart
      ) {
        toggleCartHandler();
      }
    },
    [showCart]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutSideClick, true);

    return () => {
      document.removeEventListener("click", handleOutSideClick, true);
    };
  }, [handleOutSideClick]);

  useEffect(() => {
    if (showCart && window.matchMedia("(max-width: 768px)").matches) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCart]);

  return (
    <div className={classes.shoppingBag} ref={cartRef}>
      <div onClick={() => toggleCartHandler()}>
        {!showCart && (
          <>
            <img src={ShoppingBag} alt="" />
            <span className={totalAmount >= 100 ? classes.smallerSpanFont : ""}>
              {totalAmount < 100 ? totalAmount : "99+"}
            </span>
          </>
        )}
        {showCart && <CloseIcon className={classes.closeBtn} />}
      </div>
      {showCart && <Cart toggleCartHanlder={toggleCartHandler} />}
    </div>
  );
};

export default CartButton;

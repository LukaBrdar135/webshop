import { useContext, useState } from "react";
import { CartContext } from "../../store/cart-context";
import classes from "./CheckoutLayout.module.css";
import uiClasses from "../UI/UI.module.css";
import useHttp from "../../hooks/use-http";
import { FIREBASE_URL } from "../../globals/GlobalConstants";
import { AuthContext } from "../../store/auth-context";
import CheckoutTableDesktop from "./CheckoutTableDesktop";
import CheckoutTableMobile from "./CheckoutTableMobile";

const CheckoutGrid: React.FC = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const finishOrderHandler = async () => {
    sendRequest(
      {
        url: FIREBASE_URL + "orders.json",
        method: "POST",
        headers: {
          "Content-Type": "applictation/json",
        },
        body: {
          items: cartCtx.items,
          totalAmount: cartCtx.totalAmount,
          user: authCtx.email,
        },
      },
      () => {
        cartCtx.clearCart();
        setSuccess(true);
      }
    );
  };

  return (
    <div className={classes.table}>
      <div className={uiClasses.smallScreenAndMoreView}>
        <CheckoutTableDesktop
          items={cartCtx.items}
          error={error}
          success={success}
          isLoading={isLoading}
          finishOrder={finishOrderHandler}
        />
      </div>

      <div className={uiClasses.tabletAndLessView}>
        <CheckoutTableMobile
          items={cartCtx.items}
          error={error}
          success={success}
          isLoading={isLoading}
          finishOrder={finishOrderHandler}
        />
      </div>
    </div>
  );
};

export default CheckoutGrid;

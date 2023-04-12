import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../store/cart-context";
import classes from "./Cart.module.css";
import uiClasses from "../UI/UI.module.css";
import CartItem from "./CartItem";
import { AuthContext } from "../../store/auth-context";
import Button from "../UI/Button";

const Cart: React.FC<{ toggleCartHanlder: () => void }> = (props) => {
  const { items: cartItems } = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  let content: React.ReactNode;

  if (cartItems.length === 0) {
    content = <h3 className={uiClasses.textCenter}>No items in cart</h3>;
  } else {
    content = (
      <>
        <div className={classes.cartItems}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className={classes.cartActions}>
          {authCtx.token ? (
            <Link to="/checkout" onClick={props.toggleCartHanlder}>
              <Button type="button" design="dark">
                go to checkout
              </Button>
            </Link>
          ) : (
            <Link to="/login" onClick={props.toggleCartHanlder}>
              <Button type="button" design="dark">
                Sign in to go to checkout
              </Button>
            </Link>
          )}
        </div>
      </>
    );
  }

  return <div className={classes.cart}>{content}</div>;
};

export default Cart;

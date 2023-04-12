import CartItemType from "../../types/CartItem";
import classes from "./CartItem.module.css";

const CartItem: React.FC<CartItemType> = (props) => {
  return (
    <div className={classes.item}>
      <img src={props.imageUrl} alt="" />
      <div>
        <p>{props.name}</p>
        <p>
          {props.quantity} x ${props.price}
        </p>
      </div>
    </div>
  );
};

export default CartItem;

import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import CartItem from "../../types/CartItem";
import classes from "./CheckoutItem.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CartContext } from "../../store/cart-context";
import ToastContext from "../../store/toast-context";

export const CheckoutItem: React.FC<CartItem> = (props) => {
  const cartCtx = useContext(CartContext);
  const toastCtx = useContext(ToastContext);

  const onAddHandler = () => {
    cartCtx.addItem({
      id: props.id,
      imageUrl: props.imageUrl,
      name: props.name,
      price: props.price,
    });
  };

  const removeItemHandler = () => {
    if (
      window.confirm(
        `Are you sure you want to remove "${props.name}" from cart?`
      )
    ) {
      cartCtx.removeItem(props.id);
      toastCtx.setToast("warning", props.name + " removed from cart");
    }
  };

  return (
    <div className={classes.checkoutItem}>
      <img src={props.imageUrl} alt="" />
      <p>{props.name}</p>
      <p>
        <IconButton
          size="large"
          onClick={() => {
            cartCtx.decrementItem(props.id);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {props.quantity}
        <IconButton size="large" onClick={onAddHandler}>
          <ArrowForwardIosIcon />
        </IconButton>
      </p>
      <p>${props.price}</p>
      <p>
        <IconButton size="large" onClick={removeItemHandler}>
          <CloseIcon color="warning" />
        </IconButton>
      </p>
    </div>
  );
};

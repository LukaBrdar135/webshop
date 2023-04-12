import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../store/cart-context";
import ToastContext from "../../store/toast-context";
import ShopItemType from "../../types/ShopItem";
import Button from "../UI/Button";
import classes from "./ShopItem.module.css";

const ShopItem: React.FC<{ item: ShopItemType; route: string }> = (props) => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const toastCtx = useContext(ToastContext);

  const addToCartHandler = () => {
    cartCtx.addItem(props.item);
    toastCtx.setToast("success", "Added item to cart!");
  };

  return (
    <div className={classes.itemWrapper}>
      <div className={classes.item}>
        <div
          className={classes.imageContainer}
          style={{
            background: `url(${props.item.imageUrl}) no-repeat center center/cover`,
          }}
        >
          <div className={classes.itemOverlay}>
            <Button
              design="light"
              type="button"
              onClick={() => {
                addToCartHandler();
              }}
            >
              Add to cart
            </Button>
            {props.item.details && (
              <Button
                design="light"
                type="button"
                className={classes.btn}
                onClick={() => {
                  navigate(
                    "/shop/" + props.route + "/" + props.item.id.toString()
                  );
                }}
              >
                <Link to={props.item.id.toString()}>Product details</Link>
              </Button>
            )}
          </div>
        </div>
        <div className={classes.itemInfo}>
          <span>{props.item.name}</span>
          <span>${props.item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;

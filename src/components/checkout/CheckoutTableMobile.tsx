import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../../types/CartItem";
import Button from "../UI/Button";
import { CheckoutItem } from "./CheckoutItem";
import classes from "./CheckoutLayout.module.css";
import uiClasses from "../UI/UI.module.css";
import Spinner from "../UI/Spinner";
import { Alert } from "@mui/material";

type Props = {
  items: CartItem[];
  finishOrder: () => void;
  error: string | null;
  isLoading: boolean;
  success: boolean;
};

const CheckoutTableMobile: React.FC<Props> = (props) => {
  let heading = (
    <div className={classes.heading}>
      <p>Product</p>
      <p>Name</p>
      <p>Qantity</p>
      <p>Price</p>
      <p>Remove</p>
    </div>
  );

  return (
    <>
      {props.error && <Alert severity="error">Something went wrong</Alert>}
      {props.success && <Alert severity="success">Successfully ordered!</Alert>}
      {props.items.map((item) => (
        <div className={classes.itemWrapper} key={item.id}>
          {heading}
          <CheckoutItem {...item} />
        </div>
      ))}
      <div className={classes.actions}>
        {props.items.length > 0 && (
          <>
            {!props.isLoading ? (
              <Button design="dark" type="button" onClick={props.finishOrder}>
                Finish order
              </Button>
            ) : (
              <Spinner />
            )}
          </>
        )}
        {props.items.length <= 0 && (
          <div className={classes.textCenter}>
            <h3 className={`${uiClasses.textUpper} ${uiClasses.padY2}`}>
              Cart is empty
            </h3>
            <Link to="/shop" className={uiClasses.padY2}>
              <Button design="dark" type="button">
                Go to shop
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutTableMobile;

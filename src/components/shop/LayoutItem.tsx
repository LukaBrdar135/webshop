import React from "react";
import { Link } from "react-router-dom";
import Shop from "../../types/Shop";
import classes from "./LayoutItem.module.css";
import ShopItem from "./ShopItem";

const LayoutItem: React.FC<Shop> = (props) => {
  return (
    <div className={classes.item}>
      <h2>
        <Link to={"/shop/" + props.routeName}>{props.title}</Link>
      </h2>
      <div className={classes.itemRow}>
        {props.items.map((item) => (
          <ShopItem key={item.id} item={{ ...item }} route={props.routeName} />
        ))}
      </div>
    </div>
  );
};

export default LayoutItem;

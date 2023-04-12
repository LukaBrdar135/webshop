import React from "react";
import classes from "./SectionItem.module.css";
import uiClasses from "../UI/UI.module.css";
import { Link } from "react-router-dom";

const CategoryItem: React.FC<{
  imageUrl: string;
  title: string;
  linkUrl: string;
}> = ({ imageUrl, title, linkUrl }) => {
  return (
    <Link
      to={linkUrl}
      className={classes.gridItem}
      style={{
        background: `url(${imageUrl}) no-repeat center center/cover`,
      }}
    >
      <div className={classes.itemContent + " " + uiClasses.textCenter}>
        <h3>{title}</h3>
        <h4>Shop now</h4>
      </div>
    </Link>
  );
};

export default CategoryItem;

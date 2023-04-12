import { Breadcrumbs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./Breadcrumbs.module.css";

const Breadcrumb: React.FC<{
  crumbs: string[];
}> = (props) => {
  const navigate = useNavigate();

  const clickHandler = (crumb: string, index: number) => {
    let path = props.crumbs.join("/");
    path = path.slice(path.indexOf("/"));
    path = path.substring(0, path.lastIndexOf("/"));

    if (index === 0) {
      navigate("/");
      return;
    }

    const indexes = [];

    for (let index = 0; index < path.length; index++) {
      if (path[index] === "/") {
        indexes.push(index);
      }
    }

    navigate(path.substring(indexes[0], indexes[index]).toLocaleLowerCase());
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbsHolder}>
      {props.crumbs.map((crumb, index) => {
        if (props.crumbs.length === index + 1) {
          return (
            <Typography key={index} className={classes.capitalize}>
              {crumb}
            </Typography>
          );
        }
        return (
          <div key={index}>
            <span
              className={`${classes.capitalize} ${classes.hoverUnderglow}`}
              onClick={() => {
                clickHandler(crumb, index);
              }}
            >
              {crumb}
            </span>
          </div>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;

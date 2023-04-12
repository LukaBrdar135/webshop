import { useEffect, useState } from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";
import { routes } from "../../router/Router";
import classes from "./Breadcrumbs.module.css";
import Typography from "@mui/material/Typography";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";

type StateType = { route: string; name: string }[];

type Props = { params?: { [key: string]: string } };

const Breadcrumbs: React.FC<Props> = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState<StateType>([]);
  const location = useLocation();

  useEffect(() => {
    const match = matchRoutes(routes, location.pathname);

    let propParamsKeys = Object.keys(props.params ?? {}).toString();

    if (match && Object.keys(match[0].params).toString() === propParamsKeys) {
      let pathArray = match[0].pathname.split("/");

      //Make new array from current path for each breadcrumb to have 1 more path part until there is full path
      let crumbRoutes: string[] = [];
      pathArray.forEach((path, index) => {
        if (path === "") {
          crumbRoutes.push("/");
        } else {
          crumbRoutes.push(pathArray.slice(0, index + 1).join("/"));
        }
      });

      const routePathArray = match[0].route.path?.split("/");

      if (routePathArray) {
        // Make new array from react-router route where name property will be replaced by props value if it is dynamic
        let crumbs = routePathArray.map((path, index) => {
          if (index === 0) {
            return { route: crumbRoutes[index], name: "Home" };
          }

          if (path.startsWith(":") && props.params) {
            return {
              route: crumbRoutes[index],
              name: props.params[path.replace(":", "")],
            };
          }

          return { route: crumbRoutes[index], name: path };
        });

        setBreadcrumbs(crumbs);
      }
    } else {
      throw new Error("Breadcrumb error");
    }
  }, [props, location]);

  return (
    <BreadcrumbsMUI
      aria-label="breadcrumb"
      className={classes.breadcrumbsHolder}
    >
      {breadcrumbs.map((crumb, index) => {
        if (breadcrumbs.length === index + 1) {
          return (
            <Typography key={index} className={classes.capitalize}>
              {crumb.name}
            </Typography>
          );
        }
        return (
          <div key={index}>
            <Link
              to={crumb.route}
              className={`${classes.capitalize} ${classes.hoverUnderglow}`}
            >
              {crumb.name}
            </Link>
          </div>
        );
      })}
    </BreadcrumbsMUI>
  );
};

export default Breadcrumbs;

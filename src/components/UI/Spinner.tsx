import classes from "./Spinner.module.css";
import uiClasses from "./UI.module.css";

const Spinner: React.FC<{
  centered?: boolean;
  size?: "small" | "medium" | "large" | "fill";
}> = ({ centered = true, size }) => {
  if (centered) {
    return (
      <div className={centered ? uiClasses.textCenter : ""}>
        <div
          className={`${classes.loader} ${size && size ? classes[size] : ""}`}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={`${classes.loader} ${size && size ? classes[size] : ""}`}
    ></div>
  );
};

export default Spinner;

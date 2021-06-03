import React from "react";
import Btn from "@material-ui/core/Button";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={styles.Button}>
      <Btn variant="outlined" color="primary" onClick={props.clicked}>
        {props.children}
      </Btn>
    </div>
  );
};

export default Button;

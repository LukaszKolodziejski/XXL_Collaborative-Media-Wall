import React from "react";
import { ReactSVG } from "react-svg";

const Histogram = (props) => {
  return (
    <div className={props.style}>
      <span>{props.name}</span>
      <ReactSVG src={props.svg} />
    </div>
  );
};

export default Histogram;

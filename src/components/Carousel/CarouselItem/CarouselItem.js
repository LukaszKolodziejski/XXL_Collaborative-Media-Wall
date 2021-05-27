import React from "react";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const className = "item level" + props.level;
  return <div className={className}>{props.id}</div>;
};

export default CarouselItem;

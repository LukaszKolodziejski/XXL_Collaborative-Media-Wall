import React from "react";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const className = "item level" + props.level;
  return (
    <div className={className}>
      <img className="image" src={props.image} alt={props.image} />
    </div>
  );
};

export default CarouselItem;

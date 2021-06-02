import React from "react";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const className = "item level" + props.level;
  return (
    <div className={className}>
      <img
        className="image"
        src={props.metadata.imageUrl}
        alt={props.metadata.tags}
      />
    </div>
  );
};

export default CarouselItem;

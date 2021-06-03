import React, { useState } from "react";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const doubleClickHandler = () => {
    props.modalClosed();
    props.activeMmetadata(props.metadata.id);
  };

  return (
    <div
      className={`item level${props.level}`}
      onDoubleClick={doubleClickHandler}
    >
      <img
        className="image"
        src={props.metadata.imageUrl}
        alt={props.metadata.tags}
      />
      {props.children}
    </div>
  );
};

export default CarouselItem;

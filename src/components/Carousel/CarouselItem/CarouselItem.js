import React, { useState } from "react";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const [imageSize, setImageSize] = useState(props.level);
  // let className = "item level" + props.level;

  const imageHandler = () => {
    if (props.level === 0) {
      setImageSize((prev) => (prev === 0 ? 9 : 0));
    }
  };

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
    </div>
  );
};

export default CarouselItem;

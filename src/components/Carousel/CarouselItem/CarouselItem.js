import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import "./styles/CarouselItem.css";

const CarouselItem = (props) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0 });
  });
  const doubleClickHandler = () => {
    props.modalClosed();
    props.activeMmetadata(props.metadata.id);
  };

  const bindOptions = props.isAnimate ? { ...bind() } : null;
  return (
    <animated.div
      {...bindOptions}
      style={{ x, y }}
      className={`item level${props.level}`}
      onDoubleClick={doubleClickHandler}
    >
      <div
        className="image"
        style={{ backgroundImage: `url(${props.metadata.imageUrl})` }}
      />
      {props.children}
    </animated.div>
  );
};

export default CarouselItem;

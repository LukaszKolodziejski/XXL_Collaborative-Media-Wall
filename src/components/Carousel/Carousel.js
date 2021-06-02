import React, { useState } from "react";

import { CSSTransitionGroup } from "react-transition-group/";
import CarouselItem from "./CarouselItem/CarouselItem";
import "./styles/Carousel.css";

const Carousel = (props) => {
  const [direction, setDirection] = useState("");

  const generateItems = () => {
    console.log(props.items);
    const items = [];
    let level;
    for (let i = props.active - 2; i < props.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = props.items.length + i;
      } else if (i >= props.items.length) {
        index = i % props.items.length;
      }
      level = props.active - i;
      items.push(
        <CarouselItem key={index} level={level} metadata={props.items[index]} />
      );
    }
    return items;
  };

  const moveLeft = () => {
    props.onSetActive((prev) => (prev-- < 0 ? props.items.length - 1 : prev--));
    setDirection("left");
  };

  const moveRight = () => {
    props.onSetActive((prev) => (prev + 1) % props.items.length);
    setDirection("right");
  };

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>
        <i className="fi-arrow-left">{"<"}</i>
      </div>
      <CSSTransitionGroup
        transitionName={direction}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={1000}
      >
        {generateItems()}
      </CSSTransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right">{">"}</i>
      </div>
    </div>
  );
};

export default Carousel;

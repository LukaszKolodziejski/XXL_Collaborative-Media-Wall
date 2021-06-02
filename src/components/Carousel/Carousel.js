import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group/";
import CarouselItem from "./CarouselItem/CarouselItem";
import "./styles/Carousel.css";
import Modal from "../UI/Modal/Modal";

const Carousel = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [activeID, setActiveID] = useState({});

  const generateItems = () => {
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
        <CarouselItem
          key={index}
          level={level}
          metadata={props.items[index]}
          modalClosed={modalHandler}
          activeMmetadata={activeIdHandler}
        />
      );
    }
    return items;
  };

  const modalHandler = () => setIsModal((prev) => !prev);
  const activeIdHandler = (id) => {
    console.log(props.items.find((item) => item.id === id));
    setActiveID(props.items.find((item) => item.id === id));
  };
  return (
    <>
      <Modal show={isModal} modalClosed={modalHandler}>
        <CarouselItem
          level={9}
          metadata={activeID}
          activeMmetadata={activeIdHandler}
          modalClosed={modalHandler}
        />
      </Modal>
      <div id="carousel" className="noselect">
        <div
          className="arrow arrow-left"
          onClick={() => props.onSetActive("left")}
        >
          <i className="fi-arrow-left">{"<"}</i>
        </div>
        <CSSTransitionGroup
          transitionName={props.direction}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1000}
        >
          {generateItems()}
        </CSSTransitionGroup>
        <div
          className="arrow arrow-right"
          onClick={() => props.onSetActive("right")}
        >
          <i className="fi-arrow-right">{">"}</i>
        </div>
      </div>
    </>
  );
};

export default Carousel;

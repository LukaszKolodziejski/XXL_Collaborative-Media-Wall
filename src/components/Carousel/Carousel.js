import React, { useState } from "react";
import { CSSTransitionGroup } from "react-transition-group/";
import CarouselItem from "./CarouselItem/CarouselItem";
import "./styles/Carousel.css";
import Modal from "../UI/Modal/Modal";
import Metadata from "../Metadata/Metadata";
import Button from "../UI/Button/Button";

const Carousel = (props) => {
  const {
    isModal,
    activeID,
    showMetadata,
    modalHandler,
    activeIdHandler,
    btnHandler,
    predictions,
  } = props;

  const generateItems = () => {
    const items = [];
    let level;
    const { length } = props.items;

    let startLoop;
    let endLoop;

    if (length >= 5) {
      startLoop = props.active - 2;
      endLoop = props.active + 3;
    } else if (length > 2 && length < 5) {
      startLoop = props.active - 1;
      endLoop = props.active + 2;
    } else if (length >= 0 && length <= 2) {
      startLoop = props.active;
      endLoop = props.active + 1;
    }

    for (let i = startLoop; i < endLoop; i++) {
      let index = i;
      index = i < 0 ? length + i : i >= length ? i % length : i;

      level = props.active - i;
      items.push(
        <CarouselItem
          key={index}
          level={level}
          items={props.items}
          isAnimate={true}
          users={props.users}
          index={index}
          metadata={props.items[index]}
          modalClosed={modalHandler}
          activeMmetadata={activeIdHandler}
          predictions={predictions}
          btnHandler={btnHandler}
        />
      );
    }
    return items;
  };

  if (props.items.length === 0) return <div>{"No data :("}</div>;

  return (
    <>
      <Modal show={isModal} modalClosed={modalHandler}>
        <Button clicked={btnHandler}>{`${
          showMetadata ? "Hide" : "Show"
        } Metadata`}</Button>
        <CarouselItem
          isAnimate={false}
          level={9}
          metadata={activeID}
          users={props.users}
          show={showMetadata}
          activeMmetadata={activeIdHandler}
          modalClosed={modalHandler}
          btnHandler={btnHandler}
        >
          <Metadata
            show={showMetadata}
            metadata={activeID}
            users={props.users}
          />
        </CarouselItem>
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

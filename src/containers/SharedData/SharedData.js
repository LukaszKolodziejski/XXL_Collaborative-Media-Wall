import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./SharedData.module.css";
import axios from "../../axios-data";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Handtrack from "../../components/Handtrack/Handtrack";

const SharedData = (props) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("");
  const [predictions, setPredictions] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [activeID, setActiveID] = useState({});
  const [showMetadata, setShowMetadata] = useState(false);

  const { images } = props;
  const filteredImages = images.filter((img) => img.user === props.user);

  const setLeft = () => {
    setActive((prev) => (prev-- < 0 ? images.length - 1 : prev--));
    setDirection("left");
  };
  const setRight = () => {
    setActive((prev) => (prev + 1) % images.length);
    setDirection("right");
  };

  const moveHandler = (key) => {
    if (key === "left") setLeft();
    else if (key === "right") setRight();
  };

  const modalHandler = () => {
    setIsModal((prev) => !prev);
    setActiveID({});
    setShowMetadata(false);
  };
  const activeIdHandler = (id) =>
    setActiveID(filteredImages.find((item) => item.id === id));

  const btnHandler = () => setShowMetadata((prev) => !prev);

  const predictionsHandler = (newPredictions) => {
    setPredictions(newPredictions);
    const predictions = newPredictions
      .filter((pred) => pred.label !== "face" && pred.label !== "point")
      .sort((a, b) => (a.bbox[0] > b.bbox[0] && 1) || -1);

    if (predictions.length === 2) {
      const leftHand = predictions[0].label;
      const rightHand = predictions[1].label;
      if (leftHand === "closed" && rightHand === "open") setLeft();
      else if (leftHand === "open" && rightHand === "closed") setRight();
      console.log(predictions);
    }
  };

  return (
    <>
      <KeyboardEventHandler
        handleKeys={["left", "right"]}
        onKeyEvent={moveHandler}
      />
      <div className={styles.SharedData}>
        <Handtrack onGetPredictions={predictionsHandler} />
        <Carousel
          items={filteredImages}
          active={active}
          users={props.users}
          direction={direction}
          onSetActive={moveHandler}
          isModal={isModal}
          activeID={activeID}
          showMetadata={showMetadata}
          modalHandler={modalHandler}
          activeIdHandler={activeIdHandler}
          btnHandler={btnHandler}
          predictions={predictions}
        />
      </div>
    </>
  );
};

export default SharedData;

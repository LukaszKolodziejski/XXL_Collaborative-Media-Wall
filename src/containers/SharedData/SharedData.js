import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./SharedData.module.css";
import axios from "../../axios-data";
import imagesWithMetadata from "../../metadata.json";
import KeyboardEventHandler from "react-keyboard-event-handler";

// const importAllimages = (r) => r.keys().map((item) => r(item).default);
const importAllimages = (r) =>
  r.keys().map((item) => {
    const imageUrl = r(item).default;
    const image = imagesWithMetadata.find((imgMeta) =>
      imageUrl.includes(imgMeta.id)
    );
    return { ...image, imageUrl };
  });

const images = importAllimages(
  require.context("../../assets/images", false, /\.(png|jpg|svg)$/)
);

const SharedData = (props) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("");

  // useEffect(() => {
  //   axios.put("marathon-2366475").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);
  console.log(imagesWithMetadata);

  const moveHandler = (key) => {
    if (key === "left") {
      setActive((prev) => (prev-- < 0 ? images.length - 1 : prev--));
      setDirection("left");
    } else if (key === "right") {
      setActive((prev) => (prev + 1) % images.length);
      setDirection("right");
    }
  };

  return (
    <>
      <KeyboardEventHandler
        handleKeys={["left", "right"]}
        onKeyEvent={moveHandler}
      />
      <div className={styles.SharedData}>
        <Carousel
          items={images}
          active={active}
          direction={direction}
          onSetActive={moveHandler}
        />
      </div>
    </>
  );
};

export default SharedData;

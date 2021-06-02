import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./SharedData.module.css";
import axios from "../../axios-data";
import imagesWithMetadata from "../../metadata.json";

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

  // useEffect(() => {
  //   axios.put("marathon-2366475").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);
  console.log(imagesWithMetadata);

  return (
    <div className={styles.SharedData}>
      <Carousel items={images} active={active} onSetActive={setActive} />
      {/* <Carousel
        items={images}
        active={active}
        metadata={imagesWithMetadata}
        onSetActive={setActive}
      /> */}
    </div>
  );
};

export default SharedData;

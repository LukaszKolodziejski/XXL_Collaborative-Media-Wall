import React, { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./SharedData.module.css";

const importAllimages = (r) => r.keys().map((item) => r(item).default);

const images = importAllimages(
  require.context("../../assets/images", false, /\.(png|jpg|svg)$/)
);

const SharedData = (props) => {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.SharedData}>
      <Carousel items={images} active={active} onSetActive={setActive} />
    </div>
  );
};

export default SharedData;

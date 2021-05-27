import React, { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./SharedData.module.css";

const SharedData = (props) => {
  const [active, setActive] = useState(0);
  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={styles.SharedData}>
      <Carousel items={items} active={active} onSetActive={setActive} />
    </div>
  );
};

export default SharedData;

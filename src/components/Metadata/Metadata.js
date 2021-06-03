import React from "react";
import styles from "./Metadata.module.css";
import HistRed from "../../assets/histograms/Histred.svg";
import HistGreen from "../../assets/histograms/Histgreen.svg";
import HistBlue from "../../assets/histograms/Histblue.svg";
import HistY from "../../assets/histograms/HistY.svg";
import HistCb from "../../assets/histograms/HistCb.svg";
import HistCr from "../../assets/histograms/HistCr.svg";
import Histogram from "../Histogram/Histogram";

const Metadata = (props) => {
  if (!props.show) return null;
  console.log(props.metadata);
  return (
    <div className={styles.Metadata}>
      <Histogram name="R" svg={HistRed} style={styles.e1} />
      <Histogram name="G" svg={HistGreen} style={styles.e2} />
      <Histogram name="B" svg={HistBlue} style={styles.e3} />
      <Histogram name="Y" svg={HistY} style={styles.e4} />
      <Histogram name="Cb" svg={HistCb} style={styles.e5} />
      <Histogram name="Cr" svg={HistCr} style={styles.e6} />
      <div className={styles.e7}>Koza</div>
    </div>
  );
};

export default Metadata;

import React from "react";
import styles from "./Metadata.module.css";
import Histogram from "../Histogram/Histogram";
import MetadataDetails from "./MetadataDetails/MetadataDetails";

const Metadata = (props) => {
  if (!props.show) return null;
  const { users, metadata } = props;

  const importAllimages = (r) =>
    r
      .keys()
      .map((item) => {
        const imageUrl = r(item).default;
        return imageUrl.includes(metadata.id) ? imageUrl : null;
      })
      .filter((item) => item != null);

  const histogramsSvg = importAllimages(
    require.context("../../assets/histograms", false, /\.(png|jpg|svg)$/)
  );

  const names = ["R", "G", "B", "Y", "Cb", "Cr"];
  const { e1, e2, e3, e4, e5, e6 } = styles;
  const styleEl = [e1, e2, e3, e4, e5, e6];
  const listHistograms = histogramsSvg.map((hist, nr) => {
    return (
      <Histogram key={hist} name={names[nr]} svg={hist} style={styleEl[nr]} />
    );
  });

  return (
    <div className={styles.Metadata}>
      {listHistograms}
      <MetadataDetails style={styles.e7} metadata={metadata} users={users} />
    </div>
  );
};

export default Metadata;

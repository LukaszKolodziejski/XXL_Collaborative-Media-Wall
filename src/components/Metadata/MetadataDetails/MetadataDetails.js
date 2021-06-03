import React from "react";
import styles from "./MetadataDetails.module.css";

const MetadataDetails = (props) => {
  const { id, tags, originalMime, numberFaces, user, kernel } = props.metadata;
  const kernels = [
    "normal",
    "emboss",
    "edgedetect",
    "edgeenhance",
    "blur",
    "sharpen",
  ];

  const generateList = (list, classes, keyItem = "") => {
    return list.map((item) => {
      const style = item === keyItem || !keyItem ? classes : null;
      return (
        <span key={item} className={style}>
          {item}
        </span>
      );
    });
  };

  return (
    <div className={[props.style, styles.MetadataDetails].join(" ")}>
      <div>Id: {id}.jpg</div>
      <div className={styles.List}>Tags: {generateList(tags, styles.Tags)}</div>
      <div>Original mime: {originalMime}</div>
      <div>Number of faces: {numberFaces}</div>
      <div className={styles.List}>
        Owner: {generateList(props.users, styles.Owner, user)}
      </div>
      <div className={styles.List}>
        Kernel: {generateList(kernels, styles.Kernel, kernel)}
      </div>
    </div>
  );
};

export default MetadataDetails;

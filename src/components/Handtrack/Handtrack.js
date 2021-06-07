import React, { useState, useEffect, useRef } from "react";
import * as handTrack from "handtrackjs";
import styles from "./styles/Handtrack.module.css";

const Handtrack = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isVideo, setIsVideo] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { model, onClearDetection } = props;

  const runDetectionInterval = async (model) => runDetection(model);

  const stopDetectionInterval = () => {
    setIntervalId(null);
    clearInterval(intervalId);
  };

  useEffect(() => {
    const clear = async () => {
      await onClearDetection(stopDetectionInterval);
      await handTrack.stopVideo(webcamRef.current);
    };
    clear();
  }, [onClearDetection]);

  const toggleVideo = async () => {
    if (!isVideo) {
      startVideo();
      setIsVideo(true);
    } else {
      handTrack.stopVideo(webcamRef.current);
      setIsVideo(false);
      stopDetectionInterval();
    }
  };

  const startVideo = async () => {
    handTrack.startVideo(webcamRef.current).then((status) => {
      if (status) {
        setIsVideo(true);
        const detection = setInterval(() => {
          runDetectionInterval(model);
        }, 250);
        setIntervalId(detection);
      }
    });
  };

  const runDetection = async (modelImg) => {
    if (webcamRef.current) {
      modelImg.detect(webcamRef.current).then((predictions) => {
        props.onGetPredictions(predictions);
        if (canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          modelImg.renderPredictions(
            predictions,
            canvasRef.current,
            context,
            webcamRef.current
          );
          if (isVideo) requestAnimationFrame(runDetection);
        }
      });
    }
  };

  const runDetectionImage = async (modelImg, img) => {
    console.log(img);
    modelImg.detect(img).then((predictions) => {
      console.log("Predictions: ", predictions);
      const context = canvasRef.current.getContext("2d");
      modelImg.renderPredictions(predictions, canvasRef.current, context, img);
    });
  };

  return (
    <div className={styles.Container}>
      <div onClick={toggleVideo} className={styles.Btn}>
        {isVideo ? "Close camera" : "Open camera"}
      </div>
      <div className={isVideo ? null : styles.Handtrack}>
        <video ref={webcamRef} className={styles.Video}></video>
        <canvas ref={canvasRef} className={styles.Canvas} />
      </div>
    </div>
  );
};

export default Handtrack;

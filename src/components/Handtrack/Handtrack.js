import React, { useState, useEffect, useRef } from "react";
import * as handTrack from "handtrackjs";
// import Image from "./imageFaceHand.jpg";
import styles from "./styles/Handtrack.module.css";

const Handtrack = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const handimgRef = useRef(null);

  const [isVideo, setIsVideo] = useState(false);
  const [model, setModel] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const modelParams = {
    flipHorizontal: true,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  // Load the model.
  useEffect(() => {
    handTrack.load(modelParams).then((lmodel) => {
      setModel(lmodel);
      console.log(lmodel);
      // runDetectionImage(lmodel, handimgRef.current);
      // runDetectionImage(lmodel, webcamRef.current);
    });
  }, []);

  const runDetectionInterval = async (model) => runDetection(model);

  const stopDetectionInterval = async () => {
    setIntervalId(null);
    clearInterval(intervalId);
  };

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
      console.log("video started", status);
      if (status) {
        setIsVideo(true);
        console.log(model);
        console.log("model");
        const detection = setInterval(() => {
          runDetectionInterval(model);
        }, 250);
        setIntervalId(detection);
      }
    });
  };

  const runDetection = async (modelImg) => {
    modelImg.detect(webcamRef.current).then((predictions) => {
      props.onGetPredictions(predictions);
      const context = canvasRef.current.getContext("2d");
      modelImg.renderPredictions(
        predictions,
        canvasRef.current,
        context,
        webcamRef.current
      );
      if (isVideo) requestAnimationFrame(runDetection);
    });
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
      {/* <div>
        <img alt="Img" ref={handimgRef} src={Image} className={styles.Image} />
      </div> */}
    </div>
  );
};

export default Handtrack;

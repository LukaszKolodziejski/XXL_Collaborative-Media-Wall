import React, { useState, useEffect, useRef } from "react";
import * as handTrack from "handtrackjs";
import Image from "./imageFaceHand.jpg";
import styles from "./styles/Handtrack.module.css";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const handimgRef = useRef(null);

  const [isVideo, setIsVideo] = useState(false);
  const [model, setModel] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [progress, setProgress] = useState(0);

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
  const wrapperBar = useRef(null);

  useEffect(() => {
    if (wrapperBar.current) wrapperBar.current.style.width = `${2 * progress}%`;
    const clear = async () => {
      await stopDetectionInterval();
      await handTrack.stopVideo(webcamRef.current);
    };
    if (progress === 50) clear();
  }, [progress]);

  useEffect(() => {
    handTrack.load(modelParams).then((lmodel) => {
      setModel(lmodel);
      // runDetectionImage(lmodel, handimgRef.current);
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
        }, 50);
        setIntervalId(detection);
      }
    });
  };

  const authenticate = (predictions) => {
    const pred = predictions.filter((pred) => pred.label === "face");
    if (pred.length === 1) setProgress((prev) => (prev < 50 ? prev + 1 : prev));
  };

  const runDetection = async (modelImg) => {
    if (webcamRef.current) {
      modelImg.detect(webcamRef.current).then(async (predictions) => {
        await authenticate(predictions);
        if (canvasRef.current && progress < 50) {
          const context = canvasRef.current.getContext("2d");
          modelImg.renderPredictions(
            predictions,
            canvasRef.current,
            context,
            webcamRef.current
          );
        }
        if (isVideo) requestAnimationFrame(runDetection);
      });
    }
  };

  const runDetectionImage = async (modelImg, img) => {
    console.log(img);
    modelImg.detect(img).then((predictions) => {
      const context = canvasRef.current.getContext("2d");
      modelImg.renderPredictions(predictions, canvasRef.current, context, img);
    });
  };

  const ProgressAuth = (
    <div className={styles.ProgressAuth}>
      <div className={styles.ProgressText}>Progress of Authenticate</div>
      <div className={styles.Progress}>
        <div ref={wrapperBar} className={styles.Bar}>
          {2 * progress}
        </div>
      </div>
    </div>
  );

  if (progress === 50) return <Redirect to="/folder-shared" />;

  return (
    <div>
      <div onClick={toggleVideo} className={isVideo ? styles.Hide : styles.Btn}>
        {isVideo ? "Close camera" : "Open camera to authenticate"}
      </div>
      {ProgressAuth}
      <div className="container">
        <div className={isVideo ? null : styles.Handtrack}>
          <video ref={webcamRef} className={styles.Video}></video>
          <canvas ref={canvasRef} className={styles.Canvas} />
        </div>
        <div>
          <img
            alt="Img"
            ref={handimgRef}
            src={Image}
            className={styles.Image}
          />
        </div>
      </div>
    </div>
  );
};

export default Logout;

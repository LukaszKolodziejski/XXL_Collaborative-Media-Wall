import React, { useState, useEffect, useRef } from "react";
import * as handTrack from "handtrackjs";
import Image from "./imageFaceHand.jpg";
import styles from "./styles/Handtrack.module.css";

const Logout = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const handimgRef = useRef(null);

  let imgindex = 1;
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
      // detect objects in the image.
      setModel(lmodel);
      console.log(lmodel);
      // updateNote.innerText = "Loaded Model!";

      // runDetectionImage(lmodel, handimgRef.current); //<<<<<<<<
      // runDetectionImage(lmodel, webcamRef.current); //<<<<<<<<<

      // trackButton.disabled = false;
      // nextImageButton.disabled = false;
    });
  }, []);

  const runDetectionInterval = async (model) => runDetection(model);

  const stopDetectionInterval = async () => {
    setIntervalId(null);
    clearInterval(intervalId);
  };

  const toggleVideo = async () => {
    if (!isVideo) {
      // updateNote.innerText = "Starting video";
      startVideo();
      setIsVideo(true);
    } else {
      // updateNote.innerText = "Stopping video";
      handTrack.stopVideo(webcamRef.current);
      setIsVideo(false);
      stopDetectionInterval();
      // setModel(null);
      // updateNote.innerText = "Video stopped";
    }
  };

  const startVideo = async () => {
    // const startVideo = () => {
    handTrack.startVideo(webcamRef.current).then((status) => {
      console.log("video started", status);
      if (status) {
        // updateNote.innerText = "Video started. Now tracking";
        setIsVideo(true);
        console.log(model);
        console.log("model");
        const detection = setInterval(() => {
          runDetectionInterval(model);
        }, 70);
        setIntervalId(detection);
      } else {
        // updateNote.innerText = "Please enable video";
      }
    });
  };

  // nextImageButton.addEventListener("click", function () {
  //   nextImage();
  // });

  // trackButton.addEventListener("click", function () {
  //   toggleVideo();
  // });

  // function nextImage() {
  //   imgindex++;
  //   handimg.src = "../images/" + (imgindex % 9) + ".jpg";
  //   // alert(handimg.src)
  //   setTimeout(() => {
  //     runDetectionImage(handimg);
  //   }, 500);
  // }

  const runDetection = async (modelImg) => {
    modelImg.detect(webcamRef.current).then((predictions) => {
      console.log("Predictions: ", predictions);
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
    <div>
      <button onClick={toggleVideo}>Camera</button>
      <div className="container">
        <div id="handtrackjs">
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

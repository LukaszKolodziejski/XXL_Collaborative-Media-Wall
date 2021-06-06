import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import SharedData from "./containers/SharedData/SharedData";
import Logout from "./containers/Logout/Logout";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import imagesWithMetadata from "./metadata.json";
import * as handTrack from "handtrackjs";

const App = () => {
  const importAllimages = (r) =>
    r.keys().map((item) => {
      const imageUrl = r(item).default;
      const image = imagesWithMetadata.find((imgMeta) =>
        imageUrl.includes(imgMeta.id)
      );
      return { ...image, imageUrl };
    });

  const fetchImages = importAllimages(
    require.context("./assets/images", false, /\.(png|jpg|svg)$/)
  );

  const [images, setImages] = useState(fetchImages);
  const users = ["shared", "Łukasz", "Elsie", "Willie", "Sheri"];
  const [model, setModel] = useState(null);

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
  const clearDetection = (onClear) => onClear();

  useEffect(() => {
    setImages(fetchImages);
    // setImages(images);
  }, [imagesWithMetadata]);

  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Logout} />
        {users.map((user) => (
          <Route
            key={user}
            path={`/folder-${user}`}
            component={() => (
              <SharedData
                images={images}
                user={user}
                users={users}
                model={model}
                onClearDetection={clearDetection}
              />
            )}
          />
        ))}
      </Layout>
    </Router>
  );
};

export default App;

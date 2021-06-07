import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import SharedData from "./containers/SharedData/SharedData";
import Logout from "./containers/Logout/Logout";
import data from "./metadata.json";
import * as handTrack from "handtrackjs";

const App = () => {
  const importAllFiles = (r) =>
    r.keys().map((item) => {
      const imageUrl = r(item).default;
      const image = data.find((imgMeta) => imageUrl.includes(imgMeta.id));
      return { ...image, imageUrl };
    });

  const fetchFiles = importAllFiles(
    require.context("./assets/images", false, /\.(png|jpg|svg|mp4)$/)
  );

  const [images, setImages] = useState(fetchFiles);
  const [model, setModel] = useState(null);
  const users = ["shared", "Łukasz", "Elsie", "Willie", "Sheri"];

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

  useEffect(() => {
    handTrack.load(modelParams).then((lmodel) => setModel(lmodel));
  }, []);

  const clearDetection = (onClear) => onClear();

  useEffect(() => {
    setImages(fetchFiles);
  }, [data]);

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

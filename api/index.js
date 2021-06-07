const express = require("express");
const fs = require("fs");
const path = require("path");
const metadata = require("../src/metadata.json");
var Jimp = require("jimp");
const app = express();
const PORT = 8080;

// Jimp.read(PHOTO_PATH).then((img) => img);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.get("/metadata", (req, res) => {
  //   Jimp.read(PHOTO_PATH)
  //     .then((img) => {
  //       res.send({ ...metadata[0], exif: img._exif });
  //       return img;
  //     })
  res.send(metadata);
});

app.put("/metadata/:metadataId/:kind-:newMetadata", (req, res) => {
  const { metadataId, newMetadata, kind } = req.params;

  const foundFile = metadata.find((it) => it.id == metadataId);
  if (!foundFile) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }

  const METADATA_PATH = path.join(__dirname, `../src/metadata.json`);

  const newMetadataArray = metadata.map((data) => {
    if (data.id === metadataId) {
      if (kind === "user") {
        return {
          ...data,
          user: newMetadata,
        };
      } else if (kind === "kernel") {
        return {
          ...data,
          kernel: newMetadata,
        };
      }
    } else return data;
  });

  const dataJson = JSON.stringify(newMetadataArray);
  fs.writeFile(METADATA_PATH, dataJson, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
  res.send(newMetadata);
});

function findMetadataFile(req, res) {
  const { metadataId } = req.params;
  console.log(metadataId);
  const foundFile = metadata.find((it) => it.id == metadataId);
  if (!foundFile) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }
  return foundFile;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Example app listening at http://localhost:${PORT}/metadata`);
});

const express = require("express");
const exiftool = require("node-exiftool");
const exiftoolBin = require("dist-exiftool");
const fs = require("fs");
const path = require("path");
// const metadata = require("./metadata.json");
const metadata = require("../src/metadata.json");
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// To działa ;)
var Jimp = require("jimp");
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const ep = new exiftool.ExiftoolProcess(exiftoolBin);
const app = express();
const PORT = 8080;
// const tasks = require("./tasks.json");
// const users = require("./users.json");

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const PHOTO_PATH = path.join(__dirname, "./images/20210530_165823.jpg");
// const PHOTO_PATH = path.join(__dirname, "./images/baseball-1536097_1920.jpg");
// const PHOTO_PATH = path.join(__dirname, "./images/marathon-2366475.jpg");
// const rs = fs.createReadStream(PHOTO_PATH);

// ep.open()
//   .then(() => ep.readMetadata(rs, ["-File:all"]))
//   .then((res) => {
//     // console.log(res);
//   })
//   .then(
//     () => ep.close(),
//     () => ep.close()
//   )
//   .catch(console.error);
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// To działa ;)
// Jimp.read(PHOTO_PATH)
//   .then((img) => {
//     console.log("img");
//     console.log(img);
//     return img;
//   })
//   .catch((err) => {
//     console.log("err img");
//     console.error(err);
//   });
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
  //       console.log("img");
  //       console.log(img);
  //       res.send({ ...metadata[0], exif: img._exif });
  //       return img;
  //     })
  //     .catch((err) => {
  //         console.log("err img");
  //         console.error(err);
  //     });
  res.send(metadata);
});

app.put("/metadata/:metadataId/:kind-:newMetadata", (req, res) => {
  const { metadataId, newMetadata, kind } = req.params;

  const foundFile = metadata.find((it) => it.id == metadataId);
  if (!foundFile) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }

  // const METADATA_PATH = path.join(__dirname, `../src/newMetadata.json`);
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

// app.put("/metadata/:metadataId/", (req, res) => {
//   const foundFile = findMetadataFile(req, res);
//   const { metadataId } = req.params;
//   //   const PHOTO_PATH = path.join(__dirname, `./images/${metadataId}.jpg`);
//   const PHOTO_PATH = path.join(
//     __dirname,
//     `../src/assets/images/${metadataId}.jpg`
//   );
//   const METADATA_PATH = path.join(__dirname, `./metadata.json`);

//   Jimp.read(PHOTO_PATH)
//     .then((img) => {
//       console.log("img");
//       //   console.log(img);
//       foundFile.exif = img._exif;

//       //   const data = [...metadata, foundFile];
//       //   const dataJson = JSON.stringify(data);
//       //   fs.writeFile(METADATA_PATH, dataJson, (err) => {
//       //     if (err) {
//       //       throw err;
//       //     }
//       //     console.log("JSON data is saved.");
//       //   });
//       res.send(foundFile);
//       return img;
//     })
//     .catch((err) => {
//       console.log("err img");
//       console.error(err);
//     });
// });

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

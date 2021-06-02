const path = require("path");
const PHOTO_PATH = path.join(__dirname, "./images/baseball-1536097_1920.jpg");
// const PHOTO_PATH = path.join(__dirname, "./images/bananas-1119790_1920.jpg");

function createHistograms() {
  const Jimp = require("jimp");
  const imghist = require("./imagehistograms.js");

  Jimp.read(PHOTO_PATH, function (err, photo) {
    if (err) {
      console.error(err);
    } else {
      const histred = imghist.histogramRGB(imghist.colorChannels.Red, photo);
      saveHistogram(histred, "histred.svg");

      const histgreen = imghist.histogramRGB(
        imghist.colorChannels.Green,
        photo
      );
      saveHistogram(histgreen, "histgreen.svg");

      let histblue = imghist.histogramRGB(imghist.colorChannels.Blue, photo);
      saveHistogram(histblue, "histblue.svg");
    }
  });
}

function saveHistogram(histogramstring, filename) {
  const fs = require("fs");

  const HIST_PATH = path.join(__dirname, filename);
  fs.writeFile(HIST_PATH, histogramstring, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(filename + " saved");
    }
  });
}

createHistograms();

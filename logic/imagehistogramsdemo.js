const path = require("path");
// const PHOTO_PATH = path.join(__dirname, "./images/baseball-1536097.jpg");
const PHOTO_PATH = path.join(
  __dirname,
  "../src/assets/images/marathon-2366475.jpg"
);
// const PHOTO_PATH = path.join(__dirname, "./images/bananas-1119790_1920.jpg");

function createHistograms() {
  const Jimp = require("jimp");
  const Hist = require("./imagehistograms.js");

  Jimp.read(PHOTO_PATH, function (err, photo) {
    if (err) {
      console.error(err);
    } else {
      const histRed = Hist.histogramRGB(Hist.colorChannels.Red, photo);
      const histGreen = Hist.histogramRGB(Hist.colorChannels.Green, photo);
      const histBlue = Hist.histogramRGB(Hist.colorChannels.Blue, photo);
      const histY = Hist.histogramYCbCr(Hist.colorChannels.Y, photo);
      const histCb = Hist.histogramYCbCr(Hist.colorChannels.Cb, photo);
      const histCr = Hist.histogramYCbCr(Hist.colorChannels.Cr, photo);

      saveHistogram(histRed, "../src/assets/histograms/Histred.svg");
      saveHistogram(histGreen, "../src/assets/histograms/Histgreen.svg");
      saveHistogram(histBlue, "../src/assets/histograms/Histblue.svg");
      saveHistogram(histY, "../src/assets/histograms/HistY.svg");
      saveHistogram(histCb, "../src/assets/histograms/HistCb.svg");
      saveHistogram(histCr, "../src/assets/histograms/HistCr.svg");
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

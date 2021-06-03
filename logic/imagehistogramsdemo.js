const path = require("path");

function createHistograms() {
  const Jimp = require("jimp");
  const Hist = require("./imagehistograms.js");

  const url = "../src/assets/images/the-caucasus-5302236.jpg";
  const image = "the-caucasus-5302236";
  const PHOTO_PATH = path.join(__dirname, `../src/assets/images/${image}.jpg`);

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

      saveHistogram(
        histRed,
        `../src/assets/histograms/${image}-e1-hist-Red.svg`
      );
      saveHistogram(
        histGreen,
        `../src/assets/histograms/${image}-e2-hist-Green.svg`
      );
      saveHistogram(
        histBlue,
        `../src/assets/histograms/${image}-e3-hist-Blue.svg`
      );
      saveHistogram(histY, `../src/assets/histograms/${image}-e4-hist-Y.svg`);
      saveHistogram(histCb, `../src/assets/histograms/${image}-e5-hist-Cb.svg`);
      saveHistogram(histCr, `../src/assets/histograms/${image}-e6-hist-Cr.svg`);
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

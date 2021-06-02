exports.colorChannels = {
  Red: 0,
  Green: 1,
  Blue: 2,
};

exports.histogramRGB = function (channel, jimpImage) {
  //   const colourFrequencies = getColourFrequencies(channel, jimpImage);
  const colourFrequencies = getRGBtoYCbCrColourFrequencies(channel, jimpImage);

  const histogram = createHistogram(
    channel,
    colourFrequencies.colourFrequencies,
    colourFrequencies.maxFrequency
  );

  return histogram;
};

function getRGBtoYCbCrColourFrequencies(channel, jimpImage) {
  const startIndex = 0; // StartIndex same as RGB -> YCbCr enum: Y=0, Cb=1, Cr=2

  let maxFrequency = 0;
  const colourFrequencies = Array(256).fill(0);

  // Iterate bitmap and count frequencies of specified component values
  for (
    let i = startIndex, len = jimpImage.bitmap.data.length;
    i < len;
    i += 4
  ) {
    const rHex = jimpImage.bitmap.data[i];
    const gHex = jimpImage.bitmap.data[i + 1];
    const bHex = jimpImage.bitmap.data[i + 2];
    const r = parseInt(rHex, 16);
    const g = parseInt(gHex, 16);
    const b = parseInt(bHex, 16);

    const Y = 0.299 * r + 0.587 * g + 0.114 * b;
    const Cb = b - Y;
    const Cr = r - Y;
    const Yhex = Y.toString(16);
    // const Yhex = Cb.toString(16);
    // const Yhex = Cr.toString(16);
    // const Yhex = Math.floor(Cb).toString(16);
    // const Yhex = Y;
    colourFrequencies[Yhex]++;

    if (colourFrequencies[Yhex] > maxFrequency) {
      maxFrequency++;
    }
  }

  const result = {
    colourFrequencies: colourFrequencies,
    maxFrequency: maxFrequency,
  };

  return result;
}

function getColourFrequencies(channel, jimpImage) {
  const startIndex = channel; // StartIndex same as RGB enum: R=0, G=1, B=2

  let maxFrequency = 0;
  const colourFrequencies = Array(256).fill(0);

  // Iterate bitmap and count frequencies of specified component values
  for (
    let i = startIndex, len = jimpImage.bitmap.data.length;
    i < len;
    i += 4
  ) {
    colourFrequencies[jimpImage.bitmap.data[i]]++;

    if (colourFrequencies[jimpImage.bitmap.data[i]] > maxFrequency) {
      maxFrequency++;
    }
  }

  const result = {
    colourFrequencies: colourFrequencies,
    maxFrequency: maxFrequency,
  };

  return result;
}

function createHistogram(channel, colourFrequencies, maxFrequency) {
  const histWidth = 512;
  const histHeight = 316;
  const columnWidth = 2;
  const pixelsPerUnit = histHeight / maxFrequency;

  let hexColour;
  let x = 0;
  let columnHeight;

  let svgstring = `<svg width='${histWidth}px' height='${histHeight}px' xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink'>\n`;

  // svgstring += `    <rect fill='#ffffff;' width='${histWidth}px' height='${histHeight}px' y='0' x='0' />\n`;

  for (let i = 0; i <= 255; i++) {
    hexColour = i.toString(16).padStart(2, "0");

    switch (channel) {
      case exports.colorChannels.Red:
        hexColour = "#" + hexColour + "0000";
        break;
      case exports.colorChannels.Green:
        hexColour = "#00" + hexColour + "00";
        break;
      case exports.colorChannels.Blue:
        hexColour = "#0000" + hexColour;
        break;
    }
    columnHeight = colourFrequencies[i] * pixelsPerUnit;

    svgstring += `    <rect fill='${hexColour}' stroke='${hexColour}' stroke-width='0.25px' width='${columnWidth}' height='${columnHeight}' y='${
      histHeight - columnHeight
    }' x='${x}' />\n`;

    x += columnWidth;
  }

  svgstring += "</svg>";

  return svgstring;
}

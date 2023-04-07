import { csv, symbol } from "d3";

export const config = {
  svgWidth: window.innerWidth,
  svgHeight: window.innerHeight - 100,
  circleRadius: 5,
  minSymbolSyze: 10,
  maxSymbolSyze: 150,
  margin: {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  },
  columns: [
    { value: "sepalLength", label: "Sepal Length" },
    { value: "sepalWidth", label: "Sepal Width" },
    { value: "petalLength", label: "Petal Length" },
    { value: "petalWidth", label: "Petal Width" },
  ],
  xValue: (d) => d.sepalLength,
  yValue: (d) => d.sepalLength,
  symbolValue: (d) => d.species,
  symbolGenerator: (size) => symbol().size(size),
};

export const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/",
  "a08a1080b88344b0c8a7/",
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/",
  "iris.csv",
].join("");

export const parseRow = (d) => ({
  sepalLength: +d.sepal_length,
  sepalWidth: +d.sepal_width,
  petalLength: +d.petal_length,
  petalWidth: +d.petal_width,
  species: d.species,
});

export const getMainData = async (setPlotData) => {
  const data = await csv(csvUrl, parseRow);

  setPlotData({ data, isLoading: false });
};

// export const csvUrl =
//   "https://raw.githubusercontent.com/curran/data/gh-pages/dspl/countries.csv";

// export const parseRow = (d) => ({
//   sepalLength: +d.latitude,
//   sepalWidth: +d.longitude,
//   petalLength: +d.longitude,
//   petalWidth: +d.longitude,
//   species: d.species,
// });

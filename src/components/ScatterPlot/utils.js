export const svgWidth = window.innerWidth;
export const svgHeight = window.innerHeight - 100;
export const circleRadius = 5;
export const xValue = (d) => d.petalLength;
export const yValue = (d) => d.sepalLength;

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

export const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};

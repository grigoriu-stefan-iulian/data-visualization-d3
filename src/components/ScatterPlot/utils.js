import { select, scaleLinear, extent, axisLeft, axisBottom, csv } from "d3";

export const svgWidth = window.innerWidth;
export const svgHeight = window.innerHeight - 100;
export const circleRadius = 5;
export const xValue = (d) => d.petalLength;
export const yValue = (d) => d.sepalLength;

export const csvUrl =
  "https://raw.githubusercontent.com/curran/data/gh-pages/dspl/countries.csv";

export const parseRow = (d) => ({
  sepalLength: +d.latitude,
  sepalWidth: +d.longitude,
  petalLength: +d.longitude,
  petalWidth: +d.longitude,
  species: d.species,
});

export const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50,
};

export const getMainData = async (setPlotData) => {
  const data = await csv(csvUrl, parseRow);

  setPlotData({ data, isLoading: false });
};

export const generateScatterPlot = (data, id) => {
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, svgWidth - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([svgHeight - margin.bottom, margin.top]);

  const marks = data.map((d) => ({
    x: xScale(xValue(d)),
    y: yScale(yValue(d)),
    tooltipText: `${xValue(d)} - ${yValue(d)}`,
  }));

  const svg = select(`#${id}`)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", circleRadius)
    .append("title")
    .text((d) => d.tooltipText);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left} 0)`)
    .call(axisLeft(yScale));

  svg
    .append("g")
    .attr("transform", `translate(0 ${svgHeight - margin.bottom})`)
    .call(axisBottom(xScale));
};

// export const csvUrl = [
//   "https://gist.githubusercontent.com/",
//   "curran/",
//   "a08a1080b88344b0c8a7/",
//   "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/",
//   "iris.csv",
// ].join("");

// export const parseRow = (d) => ({
//   sepalLength: +d.sepal_length,
//   sepalWidth: +d.sepal_width,
//   petalLength: +d.petal_length,
//   petalWidth: +d.petal_width,
//   species: d.species,
// });

// const yAxis = axisLeft(yScale); // axisLeft return a function that needs to be called with a group element selection as argument
// const yAxisGroup = svg
//   .append("g")
//   .attr("transform", `translate(0 ${svgHeight - margin.bottom})`);
// We call axisLeft with a group element in two ways: using .call on the group selection or simply  with yAxis(yAxisGroup)
// yAxisGroup.call(yAxis); // Method 1
// yAxis(yAxisGroup); //Method 2

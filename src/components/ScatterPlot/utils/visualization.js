import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  symbols,
  scaleOrdinal,
} from "d3";
import { config } from "./index";

const {
  svgWidth,
  svgHeight,
  xValue,
  yValue,
  symbolValue,
  symbolGenerator,
  margin,
} = config;

export const generateScatterPlot = (data, id) => {
  if (!data.length || !id) {
    console.log("no data or id provided to ScatterPlot");
    return;
  }

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, svgWidth - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([svgHeight - margin.bottom, margin.top]);

  const symbolScale = scaleOrdinal()
    .domain(data.map(symbolValue))
    .range(symbols);

  const marks = data.map((d) => ({
    x: xScale(xValue(d)),
    y: yScale(yValue(d)),
    tooltipText: `Coords: (${xValue(d)}) : (${yValue(d)})`,
    path: symbolGenerator.type(symbolScale(symbolValue(d)))(),
  }));

  const svg = select(`#${id}`)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  svg
    .selectAll("path")
    .data(marks)
    .join("path")
    .attr("d", (d) => d.path)
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
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

// const yAxis = axisLeft(yScale); // axisLeft return a function that needs to be called with a group element selection as argument
// const yAxisGroup = svg
//   .append("g")
//   .attr("transform", `translate(0 ${svgHeight - margin.bottom})`);
// We call axisLeft with a group element in two ways: using .call on the group selection or simply  with yAxis(yAxisGroup)
// yAxisGroup.call(yAxis); // Method 1
// yAxis(yAxisGroup); //Method 2

// Old svg chart construction
// svg
//   .selectAll("circle")
//   .data(marks)
//   .join("circle")
//   .attr("cx", (d) => d.x)
//   .attr("cy", (d) => d.y)
//   .attr("r", circleRadius)
//   .append("title")
//   .text((d) => d.tooltipText);

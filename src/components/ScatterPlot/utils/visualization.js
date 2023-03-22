import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  symbols,
  scaleOrdinal,
  easeLinear,
  transition,
} from "d3";

import { config } from "./index";

let {
  svgWidth,
  svgHeight,
  xValue,
  yValue,
  symbolValue,
  symbolGenerator,
  minSymbolSyze,
  maxSymbolSyze,
  margin,
} = config;

let data1, id1;

export const generateScatterPlot = (data, id) => {
  data1 = data;
  id1 = id;
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
    getPath: (size) =>
      symbolGenerator(size).type(symbolScale(symbolValue(d)))(),
  }));

  const transitionEase = transition().duration(500).ease(easeLinear);

  const selection = select(`#${id}`)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  selection
    .selectAll("path")
    .data(marks)
    .join(
      (enter) =>
        enter
          .append("path")
          .attr("d", (d) => d.getPath(minSymbolSyze))
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
          .call((enter) =>
            enter
              .transition(transitionEase)
              .attr("d", (d) => d.getPath(maxSymbolSyze))
          )
          .append("title")
          .text((d) => d.tooltipText),
      (update) =>
        update
          .transition(transitionEase)
          .delay((d, i) => i * 10)
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
    );
  // .append("title")
  // .text((d) => d.tooltipText);

  selection
    .selectAll("g.y-axis")
    .data([null])
    .join("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left} 0)`)
    .call(axisLeft(yScale));

  selection
    .selectAll("g.x-axis")
    .data([null])
    .join("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0 ${svgHeight - margin.bottom})`)
    .transition(transitionEase)
    .call(axisBottom(xScale));
};

const columns = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];
let i = 0;

setInterval(() => {
  const column = columns[i % columns.length];
  xValue = (d) => d[column];
  generateScatterPlot(data1, id1);
  i++;
}, 3000);

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

// Join pattern with enter, update, delete
// .join(
//   enter => enter.append("text")
//       .attr("fill", "green")
//       .attr("x", (d, i) => i * 16)
//       .attr("y", -30)
//       .text(d => d)
//     .call(enter => enter.transition(t)
//       .attr("y", 0)),
//   update => update
//       .attr("fill", "black")
//       .attr("y", 0)
//     .call(update => update.transition(t)
//       .attr("x", (d, i) => i * 16)),
//   exit => exit
//       .attr("fill", "brown")
//     .call(exit => exit.transition(t)
//       .attr("y", 30)
//       .remove())
// );

// Join pattern with .call transition
// .join(
//   (enter) =>
//     enter
//       .append("path")
//       .attr("d", (d) => d.getPath(minSymbolSyze))
//       .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
//       .call((enter) =>
//         enter
//           .transition(transitionEase)
//           .attr("d", (d) => d.getPath(maxSymbolSyze))
//       ),
//   (update) =>
//     update
//       .transition(transitionEase)
//       .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
// );

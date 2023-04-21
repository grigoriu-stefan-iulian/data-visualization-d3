import {
  select,
  scaleLinear,
  scalePoint,
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
  symbolValue,
  symbolGenerator,
  minSymbolSyze,
  maxSymbolSyze,
  margin,
  columns,
} = config;

const positionSymbols = (selection) => {
  selection.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
};
//transitionEase
const generateMenu = (selection, id, label, callback) => {
  selection
    .selectAll("label")
    .data([null])
    .join("label")
    .attr("for", id)
    .text(label);

  const selectInput = selection
    .selectAll("select")
    .data([null])
    .join("select")
    .attr("name", id)
    .attr("id", id)
    .on("change", (event) => {
      callback(event.target.value);
    });

  selectInput
    .selectAll("option")
    .data(columns)
    .join("option")
    .attr("value", (d) => d.value)
    .text((d) => d.label);
};

export const generateScatterPlot = (data, id) => {
  if (!data.length || !id) {
    console.log("no data or id provided to ScatterPlot");
    return;
  }

  let xColumn = "sepalLength";
  let yColumn = "sepalLength";
  let configXValue = (d) => d[xColumn];
  let configYValue = (d) => d[yColumn];

  const svg = select(`#${id}`)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const renderPlot = (selection) => {
    const xScale =
      xColumn === "species"
        ? scalePoint().domain(data.map(configXValue)).padding(0.2)
        : scaleLinear().domain(extent(data, configXValue));
    xScale.range([margin.left, svgWidth - margin.right]);

    const yScale =
      yColumn === "species"
        ? scalePoint().domain(data.map(configYValue)).padding(0.2)
        : scaleLinear().domain(extent(data, configYValue));
    yScale.range([svgHeight - margin.bottom, margin.top]);

    const symbolScale = scaleOrdinal()
      .domain(data.map(symbolValue))
      .range(symbols);

    const transitionEase = transition().duration(500).ease(easeLinear);
    const growSymbolRadius = (enter) => {
      enter
        .transition(transitionEase)
        .attr("d", (d) => d.getPath(maxSymbolSyze));
    };

    const marks = data.map((d) => ({
      x: xScale(configXValue(d)),
      y: yScale(configYValue(d)),
      tooltipText: `Coords: (${configXValue(d)}) : (${configYValue(d)})`,
      getPath: (size) =>
        symbolGenerator(size).type(symbolScale(symbolValue(d)))(),
    }));

    selection
      .selectAll("path")
      .data(marks)
      .join(
        (enter) =>
          enter
            .append("path")
            .call(positionSymbols)
            .attr("d", (d) => d.getPath(minSymbolSyze))
            .call(growSymbolRadius)
            .append("title")
            .text((d) => d.tooltipText),
        (update) =>
          update
            .transition(transitionEase)
            .delay((_, i) => i * 10)
            .call(positionSymbols)
      );

    selection
      .selectAll("g.y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left} 0)`)
      .transition(transitionEase)
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

  svg.call(renderPlot);

  const menuContainer = select("body")
    .append("div")
    .attr("class", "menu-container");

  const xMenu = menuContainer.append("div");
  const yMenu = menuContainer.append("div");

  xMenu.call(generateMenu, "x-menu", "X:", (column) => {
    xColumn = column;
    svg.call(renderPlot);
  });
  yMenu.call(generateMenu, "y-menu", "Y:", (column) => {
    yColumn = column;
    svg.call(renderPlot);
  });
};

// Old Dynamic chart simulation
// let i = 0;
// setInterval(() => {
//   const column = columns[i % columns.length];
//   xValue = (d) => d[column];
//   generateScatterPlot(data1, id1);
//   i++;
// }, 3000);

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

// old xScale
// const xScale = scaleLinear()
//   .domain(extent(data, configXValue))
//   .range([margin.left, svgWidth - margin.right]);

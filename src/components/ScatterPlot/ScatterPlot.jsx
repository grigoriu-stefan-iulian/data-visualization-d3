import { useEffect, useState } from "react";
import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  max,
} from "d3";

import {
  svgWidth,
  svgHeight,
  csvUrl,
  parseRow,
  margin,
  xValue,
  yValue,
  circleRadius,
} from "./utils";

export const ScatterPlot = () => {
  const [data, setData] = useState([]);

  const getMainData = async () => {
    const data2 = await csv(csvUrl, parseRow);
    setData(data2);
  };

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([margin.left, svgWidth - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([svgHeight - margin.bottom, margin.top]);

  const marks = data.map((d) => ({
    x: xScale(xValue(d)),
    y: yScale(yValue(d)),
  }));

  useEffect(() => {
    getMainData();
    console.log("data", data);

    const svg = select("#scatter-plot")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", circleRadius);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left} 0)`)
      .call(axisLeft(yScale));
    // const yAxis = axisLeft(yScale); // axisLeft return a function that needs to be called with a group element selection as argument
    // const yAxisGroup = svg
    //   .append("g")
    //   .attr("transform", `translate(0 ${svgHeight - margin.bottom})`);
    // We call axisLeft with a group element in two ways: using .call on the group selection or simply  with yAxis(yAxisGroup)
    // yAxisGroup.call(yAxis); // Method 1
    // yAxis(yAxisGroup); //Method 2

    svg
      .append("g")
      .attr("transform", `translate(0 ${svgHeight - margin.bottom})`)
      .call(axisBottom(xScale));
  }, []);

  return <svg id="scatter-plot" />;
};

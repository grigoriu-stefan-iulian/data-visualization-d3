import { useEffect, useState } from "react";
import { select, csv, scaleLinear, extent, axisLeft, axisBottom } from "d3";

import { svgWidth, svgHeight, csvUrl, parseRow, margin } from "./utils";

export const ScatterPlot = () => {
  const [data, setData] = useState([]);

  const getMainData = async () => {
    const data2 = await csv(csvUrl, parseRow);
    setData(data2);
  };
  const xValue = (d) => d.petalLength;
  const yValue = (d) => d.sepalLength;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
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
      .attr("r", 5);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left} 0)`)
      .call(axisLeft(yScale));

    svg
      .append("g")

      .attr("transform", `translate(0 ${svgHeight - margin.bottom})`)
      .call(axisBottom(xScale));
  }, []);

  return <svg id="scatter-plot" />;
};

import { range } from "d3";

export const svgWidth = window.innerWidth;
export const svgHeight = window.innerHeight;
export const count = 30;

export const createDataSet = (timeInterval, elementsCount) => {
  return range(elementsCount).map((d) => ({
    cx: d * 15 + 40,
    cy: 200 + Math.sin(d * 0.4 + timeInterval) * 100,
    r: 15 + Math.cos(d * 0.4 + timeInterval) * 5,
  }));
};

export const circlesGenerator = (selection, data) => {
  selection
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.cx)
    .attr("cy", (d) => d.cy);
};

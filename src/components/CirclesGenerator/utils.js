import { line, range } from "d3";

export const config = {
  svgWidth: window.innerWidth,
  svgHeight: window.innerHeight,
  count: 35,
};

export const createDataSet = (timeInterval, elementsCount) => {
  return range(elementsCount).map((d) => ({
    cx: d * 15 + 40,
    cy: 200 + Math.sin(d * 0.4 + timeInterval) * 100,
    r: 10 + Math.cos(d * 0.4 + timeInterval) * 5,
  }));
};

// Generate and animate the circles
export const circlesGenerator = (selection, data) => {
  selection
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.cx)
    .attr("cy", (d) => d.cy);

  selection
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "black");
};

export const lineGenerator = line()
  .x((d) => d.cx)
  .y((d) => d.cy);

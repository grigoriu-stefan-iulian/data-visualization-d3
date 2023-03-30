import { useEffect } from "react";
import { select } from "d3";

import { config, createDataSet, circlesGenerator } from "./utils";

let t = 0;

export const CirclesGenerator = () => {
  const { svgWidth, svgHeight, count } = config;

  useEffect(() => {
    const svg = select("#circles-generator")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    setInterval(() => {
      const data = createDataSet(t, count);
      svg.call(circlesGenerator, data);
      t = t + 0.1;
    }, 100);
  });

  return <svg id="circles-generator" />;
};

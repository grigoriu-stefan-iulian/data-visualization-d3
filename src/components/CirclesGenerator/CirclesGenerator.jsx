import { select } from "d3";
import { useEffect } from "react";

import {
  svgWidth,
  svgHeight,
  count,
  createDataSet,
  circlesGenerator,
} from "./utils";

let t = 0;

export const CirclesGenerator = () => {
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

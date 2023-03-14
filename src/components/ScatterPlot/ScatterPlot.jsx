import { select } from "d3";
import { useEffect } from "react";

import { svgWidth, svgHeight } from "./utils";

export const ScatterPlot = () => {
  useEffect(() => {
    const svg = select("#scatter-plot")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  });

  return <svg id="scatter-plot" />;
};

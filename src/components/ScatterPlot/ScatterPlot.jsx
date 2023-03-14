import { select, csv } from "d3";
import { useEffect, useState } from "react";

import { svgWidth, svgHeight, csvUrl, parseRow } from "./utils";

export const ScatterPlot = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(csvUrl, parseRow).then((d) => {
      setData(d);
    });
    console.log("data", data);

    const svg = select("#scatter-plot")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  }, []);

  return <svg id="scatter-plot" />;
};

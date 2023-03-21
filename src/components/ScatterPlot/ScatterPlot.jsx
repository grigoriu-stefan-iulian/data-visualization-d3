import React, { useEffect } from "react";

import { generateScatterPlot, useScatterPlotData } from "./utils/index.js";

export const ScatterPlot = () => {
  const { data, isLoading } = useScatterPlotData();

  useEffect(() => {
    !isLoading && generateScatterPlot(data, "scatter-plot");
  }, [isLoading]);

  return <svg id="scatter-plot" />;
};

import React, { useEffect, useState } from "react";

import { generateScatterPlot, getMainData } from "./utils";

export const ScatterPlot = () => {
  const [plotData, setPlotData] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    getMainData(setPlotData);
  }, []);

  useEffect(() => {
    !plotData.isLoading && generateScatterPlot(plotData.data, "scatter-plot");
  }, [plotData.isLoading]);

  return <svg id="scatter-plot" />;
};

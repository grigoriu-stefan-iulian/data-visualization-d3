import React, { useEffect, useMemo } from "react";
import { generateScatterPlot, useScatterPlotData } from "./utils/index.js";

export const ScatterPlot = () => {
  const { data, isLoading } = useScatterPlotData();

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (!isLoading) {
      generateScatterPlot(memoizedData, "scatter-plot");
    }
  }, [isLoading, memoizedData]);

  return <svg id="scatter-plot" />;
};
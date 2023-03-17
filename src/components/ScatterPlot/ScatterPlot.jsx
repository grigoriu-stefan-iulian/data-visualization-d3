import React, { useEffect, useState } from "react";
import { csv } from "d3";

import { csvUrl, parseRow, generateScatterPlot } from "./utils";

export const ScatterPlot = () => {
  const [data, setData] = useState([]);

  const getMainData = async () => {
    const fetchedData = await csv(csvUrl, parseRow);
    setData(fetchedData);
  };

  useEffect(() => {
    getMainData();

    generateScatterPlot(data, "scatter-plot");
  }, []);

  return <svg id="scatter-plot" />;
};

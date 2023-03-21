import { useEffect, useState } from "react";

import { getMainData } from "./index";

export const useScatterPlotData = () => {
  const [plotData, setPlotData] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    getMainData(setPlotData);
  }, []);

  return {
    data: plotData.data,
    isLoading: plotData.isLoading,
  };
};

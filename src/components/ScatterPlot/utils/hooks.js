import { useEffect, useState } from "react";
import { getMainData } from "./index";

export const useScatterPlotData = () => {
  const [plotData, setPlotData] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    getMainData(setPlotData);
  }, []);

  return plotData;
};

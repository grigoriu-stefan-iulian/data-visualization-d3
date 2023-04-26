import { useEffect, useState } from "react";
import { getMainData } from "./index";

// Custom hook named useScatterPlotData is defined
export const useScatterPlotData = () => {
  // useState hook is used to define initial state of plotData object
  // which has isLoading property set to true and data property set to an empty array
  const [plotData, setPlotData] = useState({
    isLoading: true,
    data: [],
  });

  // useEffect hook is used to trigger fetching main data using getMainData function
  //and updating state of plotData after component mount
  useEffect(() => {
    getMainData(setPlotData);
  }, []);

  // State object plotData is returned so that it can be used in another component
  return plotData;
};

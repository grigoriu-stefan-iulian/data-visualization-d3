import { csv, select, timeParse } from "d3";
import { scatterPlot } from "./scatterPlot";
import { menu } from "./menu";

const csvUrl =
  "https://gist.githubusercontent.com/maxthamt/e234737037f6736749543e87c465d9c9/raw/2e94c65b27ea960a8d614e8e2965b4e5fc847389/whl_2.csv";

const parseRow = (d) => {
  d.longitude = +d.longitude;
  d.latitude = +d.latitude;
  d.area_hectares = +d.area_hectares;
  d.date_inscribed = timeParse("%Y")(d.date_inscribed);
  return d;
};

const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.75;
const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const menuContainer = select("body")
  .append("div")
  .attr("class", "menu-container");

const xMenu = menuContainer.append("div").attr("class", "xMenu");
const yMenu = menuContainer.append("div").attr("class", "yMenu");

const main = async () => {
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(await csv(csvUrl, parseRow))
    .xValue((d) => d.longitude)
    .yValue((d) => d.latitude)
    .colorValue((d) => d.continent2)
    .margin({
      top: 50,
      right: 20,
      bottom: 30,
      left: 120,
    })
    .radius(5);

  console.log(await csv(csvUrl, parseRow));

  svg.call(plot);

  const options = [
    {
      value: "longitude",
      text: "Longitude",
      type: "quantitative",
    },
    {
      value: "latitude",
      text: "Latitude",
      type: "quantitative",
    },
    {
      value: "continent2",
      text: "Continent",
      type: "categorical",
    },
    {
      value: "date_inscribed",
      text: "Date Inscribed",
      type: "time",
      timeFormat: "%Y",
    },
  ];

  const columnToType = new Map(options.map(({ value, type }) => [value, type]));
  options.forEach((option) => {
    columnToType.set(option.value, option.type);
  });

  const getType = (column) => columnToType.get(column);

  xMenu.call(
    menu()
      .id("x-menu")
      .labelText(" X:")
      .options(options)
      .on("change", (column) => {
        console.log(getType(column));
        svg.call(plot.xValue((d) => d[column]).xType(getType(column)));
      })
  );
  yMenu.call(
    menu()
      .id("y-menu")
      .labelText("Y:")
      .options(options)
      .on("change", (column) => {
        svg.call(plot.yValue((d) => d[column]).yType(getType(column)));
      })
  );
};
main();

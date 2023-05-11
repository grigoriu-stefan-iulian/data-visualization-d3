import {
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  extent,
  axisLeft,
  axisBottom,
  transition,
} from "d3";

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let colorValue;
  let xType;
  let yType;
  let margin;
  let radius;

  const dataTypeToScaleX = {
    categorical: scalePoint().domain(data.map(xValue)).padding(0.2),
    numerical: scaleLinear().domain(extent(data, xValue)),
    time: scaleTime().domain(extent(data, xValue)),
  };

  const dataTypeToScaleY = {
    categorical: scalePoint().domain(data.map(yValue)).padding(0.2),
    numerical: scaleLinear().domain(extent(data, yValue)),
    time: scaleTime().domain(extent(data, yValue)),
  };

  const my = (selection) => {
    const x = dataTypeToScaleX[xType].range([
      margin.left,
      width - margin.right,
    ]);
    const y = dataTypeToScaleY[yType].range([
      height - margin.bottom,
      margin.top,
    ]);

    const colorsRainbow = [
      "#59B371",
      "#F6B933",
      "#54C2EE",
      "#C061A2",
      "#EA5054",
    ];

    const color = scaleOrdinal()
      .domain(["Africa", "Asia", "Europe", "Oceania", "America"])
      .range(colorsRainbow);

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      color: color(colorValue(d)),
    }));

    const t = transition().duration(1000);

    const jitterMagnitude = 10;
    const addJitter = (n) => {
      return n + Math.random() * jitterMagnitude - jitterMagnitude / 2;
    };

    const positionCircles = (circles) => {
      circles
        .attr("cx", (d) => addJitter(d.x))
        .attr("cy", (d) => addJitter(d.y));
    };

    const colorCircles = (circles) => {
      circles.attr("fill", (d) => color(d.color)).style("fill-opacity", 0.2);
    };

    const initializeRadius = (circles) => {
      circles.attr("r", 0);
    };
    const growRadius = (enter) => {
      enter.transition(t).attr("r", radius);
    };

    const circles = selection
      .selectAll("circle")
      .data(marks)
      .join(
        (enter) =>
          enter
            .append("circle")
            .call(positionCircles)
            .call(initializeRadius)
            .call(colorCircles)
            .call(growRadius),
        (update) =>
          update.call((update) => update.transition(t).call(positionCircles)),
        (exit) => exit.remove()
      );

    selection
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .transition(t)
      .call(axisLeft(y));

    selection
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .transition(t)
      .call(axisBottom(x));
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.colorValue = function (_) {
    return arguments.length ? ((colorValue = _), my) : colorValue;
  };

  my.xType = function (_) {
    return arguments.length ? ((xType = _), my) : xType;
  };

  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  return my;
};

import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  transition,
} from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let margin;
  let data;
  let xValue;
  let yValue;
  let race;
  let axisPadding;
  let radius;

  const my = (selection) => {
    const xScale = scaleLinear()
      .domain(extent(data.map((d) => d[xValue])))
      .range([margin.left, width - margin.right])
      .nice();

    const yScale = scaleLinear()
      .domain(extent(data.map((d) => d[yValue])))
      .range([height - margin.bottom, margin.top])
      .nice();

    const t = transition().duration(1000);

    const positionCircles = (circles) => {
      circles
        .attr('cx', (d) => xScale(d[xValue]))
        .attr('cy', (d) => yScale(d[yValue]));
    };

    const initialzeRadius = (circles) => {
      circles.attr('r', 0);
    };

    const growCircles = (circles) => {
      circles.attr('r', radius);
    };

    const circles = selection
      .selectAll('circle')
      .data(data.filter((d) => d.race === race))
      .join(
        (enter) =>
          enter
            .append('circle')
            .call(positionCircles)
            .call(initialzeRadius)
            .call(growCircles),
        (update) =>
          update.call((update) =>
            update.transition(t).call(positionCircles)
          ),
        (exit) => exit.remove()
      );

    const xAxis = selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr(
        'transform',
        `translate(0, ${
          height - margin.bottom + axisPadding
        })`
      )
      .call(axisBottom(xScale).tickValues(data.map(d => d[xValue])))

    const yAxis = selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr(
        'transform',
        `translate(${margin.left - axisPadding}, 0)`
      )
      .call(axisLeft(yScale).ticks(10, '$s'));

    return selection;
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : width;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
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

  my.race = function (_) {
    return arguments.length ? ((race = _), my) : race;
  };

  my.axisPadding = function (_) {
    return arguments.length
      ? ((axisPadding = _), my)
      : axisPadding;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = _), my) : radius;
  };

  return my;
};

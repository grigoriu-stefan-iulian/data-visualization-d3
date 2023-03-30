import React, { useRef, useEffect } from "react";
import { select, scaleLinear, max } from "d3";

import styles from "./Counter.module.css";

export const AverageSalaryGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    let salaries = [
      { year: 2015, salary: 4500 },
      { year: 2016, salary: 4800 },
      { year: 2017, salary: 6000 },
      { year: 2018, salary: 8700 },
      { year: 2019, salary: 7300 },
    ];

    // create a d3 selection out of the svg reference
    const svg = select(svgRef.current);

    // create x and y scales
    const xScale = scaleLinear().domain([2015, 2019]).range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, max(salaries, (d) => d.salary)])
      .range([300, 0]);

    // draw the axes
    svg
      .selectAll("axis")
      .data(salaries)
      .enter()
      .append("line")
      .attr("x1", (d) => xScale(d.year))
      .attr("x2", (d) => xScale(d.year))
      .attr("y1", 0)
      .attr("y2", 150)
      .attr("stroke", "#ccc");

    // draw the bars
    svg
      .selectAll("bars")
      .data(salaries)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.salary))
      .attr("width", 25)
      .attr("height", (d) => 150 - yScale(d.salary))
      .attr("fill", "red");
  }, []);

  return (
    <div className={styles.averageSalaryGraph}>
      <svg ref={svgRef}>
        <text x="50%" y="20" font-size="20">
          Average Salaries in Europe Last 5 Years
        </text>
      </svg>
    </div>
  );
};

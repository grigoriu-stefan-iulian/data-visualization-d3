import { select, range, ascending, descending } from "d3";

import "./styles.css";
const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let t = 0;
setInterval(() => {
  console.log(t);
  const data = range(30).map((d) => ({
    id: d,
    cx: d * 15 + 40,
    cy: 200 + Math.sin(d * 0.4 + t) * 100,
  }));

  const circles = svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 20)
    .attr("cx", (d) => d.cx)
    .attr("cy", (d) => d.cy);

  t = t + 0.1;
}, 100);

export default function App() {
  return (
    <div className="App">
      <h1>Hello SVG</h1>
    </div>
  );
}

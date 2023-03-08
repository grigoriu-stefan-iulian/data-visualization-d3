import { select, range, symbols, symbol } from "d3";

import "./styles.css";

const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;
const strokeWidth = 20;

console.log(symbol);

const numberOfRectangles = 25;

const svg = select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg
  .append("g")
  .selectAll("rect")
  .data(range(numberOfRectangles))
  .join("rect")
  .attr("y", (d) => d * 20)
  .attr("width", svgWidth)
  .attr("height", 10)
  .attr("mask", "url(#mask1)");

svg
  .append("g")
  .selectAll("rect")
  .data(range(numberOfRectangles))
  .join("rect")
  .attr("x", (d) => d * 20)
  .attr("width", 10)
  .attr("height", svgHeight)
  .attr("mask", "url(#mask2)");

const renderMask = (maskName, maskFill1, maskFill2) => {
  const mask = svg.append("mask").attr("id", maskName);

  mask
    .append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", maskFill1);

  mask
    .append("g")
    .attr("transform", `translate(${svgWidth / 6}, ${svgHeight / 4})`)
    .append("path")
    .attr("d", symbol(symbols[2], 20000)())
    .attr("fill", maskFill2);
};

renderMask("mask1", "black", "white");
renderMask("mask2", "white", "black");

export default function App() {
  return (
    <div className="App">
      <h1>Hello SVG</h1>
    </div>
  );
}

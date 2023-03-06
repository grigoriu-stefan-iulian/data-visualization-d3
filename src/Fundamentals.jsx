import "./styles.css";

export default function Fundamentals() {
  const svgWidth = 500;
  const svgHeight = 250;
  const strokeWidth = 20;

  return (
    <div className="App">
      <h1>Hello SVG</h1>
      <svg width="500" height={svgHeight}>
        <rect
          x="10"
          y="10"
          width={svgWidth - strokeWidth}
          height={svgHeight - strokeWidth}
          fill="none"
          stroke="cyan"
          stroke-width={strokeWidth}
        ></rect>
        <circle cx="200" cy="70" r="50" fill="red"></circle>
        <circle cx="200" cy="70" r="20"></circle>
        <line
          x1="0"
          y1="0"
          x2="250"
          y2={svgHeight - strokeWidth * 1.5}
          stroke="navy"
          stroke-width={strokeWidth}
        ></line>
        <line
          x1="243"
          y1={svgHeight - strokeWidth * 1.5}
          x2={svgWidth - strokeWidth}
          y2={svgHeight - strokeWidth * 1.5}
          stroke="navy"
          stroke-width={strokeWidth}
        ></line>
        <path
          fill="none"
          stroke="black"
          stroke-width={strokeWidth}
          d="M50, 100L50, 200L150, 200"
        ></path>
      </svg>
    </div>
  );
}

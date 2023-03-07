import "./styles.css";

export default function Fundamentals() {
  const svgWidth = 500;
  const svgHeight = 250;
  const strokeWidth = 20;

  return (
    <div className="App">
      <h1>Hello SVG</h1>
      {/* Scatter plot example
             <svg width="598" height="388">
        <rect width="598" height="388" fill="none" />
        <ellipse cx="50" cy="324" rx="50" ry="43" />
        <ellipse cx="363.5" cy="141" rx="46.5" ry="46" />
        <ellipse cx="272" cy="302" rx="45" ry="46" />
        <ellipse cx="457" cy="66" rx="34" ry="49" />
        <ellipse cx="524.5" cy="231" rx="47.5" ry="45" />
        <ellipse cx="173" cy="186.5" rx="54" ry="44.5" />
      </svg> */}

      {/* Bar Chart example
      <svg width="598" height="388" fill="steelblue">
        <rect width="598" height="388" fill="white" />
        <rect x="60" y="57" width="64" height="277" />
        <rect x="174" y="114" width="62" height="220" />
        <rect x="276" y="154" width="55" height="180" />
        <rect x="369" y="194" width="47" height="140" />
        <rect x="458" y="51" width="63" height="283" />
      </svg> */}

      {/* Bar Chart example      
      <svg width="598" height="388" fill="steelblue">
        <rect width="598" height="388" fill="white" />
        <rect x="31" y="30" width="127" height="48" />
        <rect x="31" y="309" width="195" height="48" />
        <rect x="31" y="216" width="488" height="48" />
        <rect x="31" y="123" width="292" height="48" />
      </svg> */}
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

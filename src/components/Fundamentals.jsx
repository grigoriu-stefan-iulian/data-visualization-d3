import "./styles.css";

export default function Fundamentals() {
  const svgWidth = 500;
  const svgHeight = 250;
  const strokeWidth = 20;

  // Lewit Art with D3 and pure JS intro
  // The visual marks that will appear on the page
  // const marks = [];

  // for (let i = 0; i < 25; i++) {
  //   marks.push({
  //     y: i * 20,
  //     width: svgWidth,
  //     height: 10,
  //     mask: "url(#circle-mask)",
  //   });
  // }

  // const svg = select("body")
  //   .append("svg")
  //   .attr("width", svgWidth)
  //   .attr("height", svgHeight);

  // svg
  //   .selectAll("rect")
  //   .data(marks)
  //   .join("rect")
  //   .attr("y", (data) => data.y)
  //   .attr("width", (data) => data.width)
  //   .attr("height", (data) => data.height)
  //   .attr("mask", (data) => data.mask);

  // Lewitt Artwork with pure JS
  // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // svg.setAttribute("width", svgWidth);
  // svg.setAttribute("height", svgHeight);
  // document.body.appendChild(svg);

  // const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  // mask.setAttribute("id", "circle-mask");
  // svg.appendChild(mask);

  // const rectMask = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  // rectMask.setAttribute("width", svgWidth);
  // rectMask.setAttribute("height", svgHeight);
  // rectMask.setAttribute("fill", "black");
  // mask.appendChild(rectMask);

  // const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  // circle.setAttribute("cx", svgWidth / 6);
  // circle.setAttribute("cy", svgHeight / 4);
  // circle.setAttribute("r", 50);
  // circle.setAttribute("fill", "white");
  // mask.appendChild(circle);

  // const mask2 = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  // mask2.setAttribute("id", "circle-mask2");
  // svg.appendChild(mask2);

  // const rectMask2 = document.createElementNS(
  //   "http://www.w3.org/2000/svg",
  //   "rect"
  // );
  // rectMask2.setAttribute("width", svgWidth);
  // rectMask2.setAttribute("height", svgHeight);
  // rectMask2.setAttribute("fill", "white");
  // mask2.appendChild(rectMask2);

  // const circle2 = document.createElementNS(
  //   "http://www.w3.org/2000/svg",
  //   "circle"
  // );
  // circle2.setAttribute("cx", svgWidth / 6);
  // circle2.setAttribute("cy", svgHeight / 4);
  // circle2.setAttribute("r", 50);
  // circle2.setAttribute("fill", "black");
  // mask2.appendChild(circle2);

  // for (let i = 0; i < 25; i++) {
  //   const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  //   rect.setAttribute("y", i * 20);
  //   rect.setAttribute("width", svgWidth);
  //   rect.setAttribute("height", 10);
  //   rect.setAttribute("mask", "url(#circle-mask)");
  //   svg.appendChild(rect);
  // }

  // for (let i = 0; i < 50; i++) {
  //   const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  //   rect.setAttribute("x", i * 20);
  //   rect.setAttribute("width", 10);
  //   rect.setAttribute("height", svgHeight);
  //   rect.setAttribute("mask", "url(#circle-mask2)");
  //   svg.appendChild(rect);
  // }

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

      {/* Horizontal Bar Chart example      
      <svg width="598" height="388" fill="steelblue">
        <rect width="598" height="388" fill="white" />
        <rect x="31" y="30" width="127" height="48" />
        <rect x="31" y="309" width="195" height="48" />
        <rect x="31" y="216" width="488" height="48" />
        <rect x="31" y="123" width="292" height="48" />
      </svg> */}

      {/* Horizontal Bar Chart example with labels
      <svg width="598" height="388" fill="steelblue">
        <rect width="598" height="388" fill="white" />
        <rect x="106" y="30" width="120" height="47" fill="black" />
        <rect x="106" y="306" width="185" height="47" fill="black" />
        <rect x="106" y="214" width="463" height="47" fill="black" />
        <rect x="106" y="122" width="277" height="47" fill="black" />
        <text x="40" y="60" fill="black">
          ABC
        </text>
        <text x="40" y="155" fill="black">
          DEF
        </text>
        <text x="40" y="245" fill="black">
          GHI
        </text>
        <text x="40" y="340" fill="black">
          JKL
        </text>
      </svg> */}
      {/* Line Chart example from Figma
      <svg width="608" height="408" fill="none">
        <g filter="url(#filter0_d_0_3)">
          <rect
            width="600"
            height="400"
            transform="translate(4)"
            fill="white"
          />
          <path
            d="M66 372L155.405 155.201L225 304L286 212L359.5 372L436 63.5L496 372"
            stroke="black"
            stroke-width="20"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_3"
            x="0"
            y="0"
            width="608"
            height="408"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_3"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_3"
              result="shape"
            />
          </filter>
        </defs>
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

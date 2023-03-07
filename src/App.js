import "./styles.css";

export default function App() {
  const svgWidth = 500;
  const svgHeight = 250;
  const strokeWidth = 20;

  return (
    <div className="App">
      <h1>Hello SVG</h1>
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
      </svg>
    </div>
  );
}

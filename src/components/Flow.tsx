const FlowIcon = () => (
    <svg
      width="48"
      height="38"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '8px' }}
    >
      <path
        d="M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6"
        stroke="url(#flow-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <animate
          attributeName="d"
          dur="2s"
          repeatCount="indefinite"
          values="
            M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6;
            M2 8C2 8 4 10 6 10C8 10 8.5 8 10 8C11.5 8 12 10 14 10C16 10 16.5 8 18 8C19.5 8 20 10 22 10;
            M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </path>
      <path
        d="M2 8C2 8 4 10 6 10C8 10 8.5 8 10 8C11.5 8 12 10 14 10C16 10 16.5 8 18 8C19.5 8 20 10 22 10"
        stroke="url(#flow-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.3"
        fill="none"
      >
        <animate
          attributeName="strokeOpacity"
          dur="2s"
          repeatCount="indefinite"
          values="0.3;0.5;0.3"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </path>
      <defs>
        <linearGradient id="flow-gradient" x1="2" y1="8" x2="22" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9C27B0">
            <animate
              attributeName="stop-color"
              dur="2s"
              repeatCount="indefinite"
              values="#9C27B0;#7B1FA2;#9C27B0"
              calcMode="spline"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            />
          </stop>
          <stop offset="100%" stopColor="#7B1FA2">
            <animate
              attributeName="stop-color"
              dur="2s"
              repeatCount="indefinite"
              values="#7B1FA2;#6A1B9A;#7B1FA2"
              calcMode="spline"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );

export default FlowIcon
import DistributionMap from "./DistributionMap";
import ZipChecker from "./Zipchecker";
import Stats from "./Stats";

const FLIGHT_PATH =
  "M100 480 C 220 430, 360 380, 480 320 S 720 260, 840 200"; 

export default function Coverage() {
  return (
    <section id="coverage" className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-white" />

      <div
        className="absolute inset-0 z-[1] bg-repeat pointer-events-none opacity-20"
        style={{ backgroundImage: "url('/texture-bg.jpg')", backgroundSize: "300px" }}
      />

      <div className="relative z-[2] mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Coverage</h2>
        <p>We distribute across Michigan, Indiana, Illinois, Kentucky, and Ohio</p>
        <Stats />

        <div className="relative">
        <DistributionMap />

        <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox="0 0 960 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
        >
            <defs>
            <path
                id="flightPath"
                d="M100 480 C 220 430, 360 380, 480 320 S 720 260, 840 200"
            />
            </defs>

            <use
            href="#flightPath"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.35"
            />

            <g id="planeIcon" fill="#1e3a8a" stroke="black" strokeWidth="0.6">
            <g transform="translate(-9,-9)">
                <path d="M1 9 L11 9 L16 7 L17.5 9 L16 11 L11 9 Z" />
                <path d="M6 9 L2 4 L4.2 4.2 L8.8 8.2 L9.6 9 L8.8 9.8 L4.2 13.8 L2 14 L6 9 Z" />
                <path d="M3 8.4 L0.8 6.6 L1.2 8.9 L3 10 Z" />
                <path d="M4.2 9 L1.2 7.8 L1.2 10.2 Z" />
            </g>

            <animateMotion dur="8.5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#flightPath" />
            </animateMotion>
            </g>
        </svg>
        </div>

        <div className="mt-6">
          <ZipChecker />
        </div>
      </div>
    </section>
  );
}

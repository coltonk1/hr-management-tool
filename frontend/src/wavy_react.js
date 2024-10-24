import React from "react";

const CustomSVG = ({ fill = "#23eff7", width = "241.95752mm", height = "107.40455mm" }) => (
    <svg width={width} height={height} viewBox="0 0 241.95752 107.40455" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <g id="layer1" transform="translate(12.231661,-111.61862)">
            <path
                style={{
                    fill: fill, // Use the fill prop here
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 1,
                    strokeLinecap: "round",
                    strokeDasharray: "12, 12",
                }}
                d="m -12.231661,138.7529 v 80.27026 H 229.72587 v -80.6525 c -17.63063,-11.29213 -21.29915,-23.7941 -35.93051,-26.37453 -17.90803,-3.15831 -34.19886,14.51582 -52.36679,15.28959 -16.10253,0.68581 -31.28554,-9.95697 -47.39768,-9.55599 -16.55858,0.4121 -31.6064,11.71879 -48.162165,12.23166 -16.459973,0.5099 -33.698701,-16.30086 -48.5443998,-9.17374 -6.114731,2.93556 -9.5559862,17.96525 -9.5559862,17.96525 z"
                id="path1"
            />
        </g>
    </svg>
);

export default CustomSVG;

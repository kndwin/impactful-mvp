import * as React from "react";
import { SVGProps } from "react";

type CustomSVGProps = {
  size?: number;
} & SVGProps<SVGSVGElement>;

export const Logo = ({ size = 256, ...props }: CustomSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 258 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={86} cy={170.5} rx={86} ry={85.5} fill="#9AD1DD" />
    <ellipse cx={172} cy={85.5} rx={86} ry={85.5} fill="#3A5651" />
    <rect x={86} y={85} width={86} height={86} fill="url(#paint0_linear_0_1)" />
    <defs>
      <linearGradient
        id="paint0_linear_0_1"
        x1={172}
        y1={85}
        x2={88.0451}
        y2={172.952}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9AD1DD" />
        <stop offset={1} stopColor="#3A5651" />
      </linearGradient>
    </defs>
  </svg>
);

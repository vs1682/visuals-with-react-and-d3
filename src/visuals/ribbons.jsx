import React from 'react';
import { scaleLinear } from 'd3-scale';
import { area, curveBasis } from 'd3-shape';
import Ribbon from '../components/ribbon';
import salaries from '../datasets/salaries';
import { inspirations } from '../constants';

const marginTop = 50;
const marginLeft = 50;
const maxHeight = 600;
const maxWidth = 300;

const areaX1 = scaleLinear()
  .domain([100000, 1000000])
  .range([0, maxHeight]);

const areaY1 = scaleLinear()
  .domain([0, 50])
  .range([25, 0]);

const y = scaleLinear()
  .domain([100000, 1000000])
  .range([0, maxHeight]);

const zIndex = scaleLinear()
  .domain([0, 50])
  .range([1000, 10]);

const median = 400000;
const medianHeight = y(median);

const Ribbons = () => {
  const sortedSalries = salaries.sort((a, b) => a.salary - b.salary);

  const ribbons = sortedSalries.map(({ id, salary, width }) => {
      const fill = salary < median ? '#C94642' : '#53a9c2';
      const height = y(salary);

      return (
        <Ribbon
          key={id}
          startPoint={{ x: 0, y: medianHeight }}
          endPoint={{ x: maxWidth, y: height }}
          cp1={{ x: maxWidth / 2, y: medianHeight }}
          cp2={{ x: maxWidth / 2, y: height }}
          width={width}
          fill={fill}
          opacity={0.5}
          zIndex={zIndex(width)}
        />
      );
    });

  const salaryArea = area()
    .x(d => areaX1(d.salary))
    .y1(d => areaY1(d.width))
    .y0(areaY1(0))
    .curve(curveBasis);

  const medianXPercent = areaX1(median) / maxHeight * 100;

  return (
    <svg width={2 * maxWidth + marginLeft} height={maxHeight + marginTop}>
      <defs>
        <linearGradient
          id="areaGradient"
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={maxHeight}
          y2={0}
        >
          <stop
            offset="0%"
            stopColor={"#C94642"}
          />
          <stop
            offset={`${medianXPercent}%`}
            stopColor={"#C94642"}
          />
          <stop
            offset={`${medianXPercent}%`}
            stopColor={"#53a9c2"}
          />
          <stop
            offset="100%"
            stopColor={"#53a9c2"}
          />
        </linearGradient>
      </defs>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {ribbons}
      </g>
      <g transform={`translate(${maxWidth + marginLeft + 100}, ${marginTop}) rotate(90)`}>
        <path
          d={salaryArea(sortedSalries)}
          style={{
            fill: 'url(#areaGradient)',
            fillOpacity: 0.5,
            stroke: 'url(#areaGradient)',
            strokeWidth: 1
          }}
        />
        <path
          d={`M${areaX1(median)},${-25} V75`}
          strokeDasharray="5"
          strokeWidth="1"
          stroke="black"
        />
        <text
          transform="rotate(-90)"
          y="190"
        >
          {`Median - ${median}`}
        </text>
      </g>
      <text x={2 * maxWidth - 150} y ={maxHeight + marginTop - 10}>
        {`Inspiration - ${inspirations.threads}`}
      </text>
    </svg>
  );
}

export default Ribbons;

import React, { useRef } from "react";
import { animated, useTransition } from "@react-spring/web";
import * as d3 from "d3";

interface AnimatedPieChartProps {
  data: { label: string; value: number }[];
  colors: string[];
  width?: number;
  height?: number;
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({
  data,
  colors,
  width = 500,
  height = 500,
}) => {
type DataItem = { label: string; value: number; };

  const arcs = d3.pie<DataItem>().value(d => d.value)(data);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2);

  const transitions = useTransition(arcs, {
    keys: (item) => item.data.label,
    from: { startAngle: 0, endAngle: 0 },
    enter: (item) => ({ startAngle: item.startAngle, endAngle: item.endAngle }),
    update: (item) => ({ startAngle: item.startAngle, endAngle: item.endAngle }),
  });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {transitions((props, item, t, i) => (
          <animated.path
            key={i}
            d={arcGenerator(props as any) || ''}
            fill={colors[i % colors.length]}
          />
        ))}
      </g>
    </svg>
  );
};

export default AnimatedPieChart;

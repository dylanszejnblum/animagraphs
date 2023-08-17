
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import * as d3 from "d3";

interface AnimatedBarChartProps {
  data: { label: string; value: number }[];
  colors: {
    bars: string;
    xAxis: string;
    yAxis: string;
  };
  width?: number;
  height?: number;
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  colors,
  width = 500,
  height = 500,
}) => {
  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value) || 0]).range([height, 0]);
  const xScale = d3.scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.1);

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const springProps = useSpring({
          to: { y: yScale(d.value), height: height - yScale(d.value) },
          from: { y: height, height: 0 },
        });

        return (
          <animated.rect
            key={i}
            x={xScale(d.label)}
            y={springProps.y}
            width={xScale.bandwidth()}
            height={springProps.height}
            fill={colors.bars}
          />
        );
      })}
    </svg>
  );
};

export default AnimatedBarChart;

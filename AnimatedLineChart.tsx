import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

import * as d3 from "d3";

interface AnimatedLineChartProps {
  points: number[][];
  width: number; // Change to number
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  setActiveDataCallback: (data: { x: Date; y: number } | null) => void;
  color: string;
  displayValues: boolean;
}

const AnimatedLineChart: React.FC<AnimatedLineChartProps> = ({
  points,
  width,
  height,
  margin,
  setActiveDataCallback,
  color,
  displayValues,
}) => {
  const data = points.map(([x, y]) => ({ x: new Date(x * 1000), y }));

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.x) as [Date, Date])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y) as number])
    .nice()
    .range([height - margin.bottom, margin.top]);
  const lineGenerator = d3
    .line<{ x: Date; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);
  const linePath = lineGenerator(data);
  const animationProps = useSpring({
    from: { d: linePath, opacity: 0 },
    to: { d: linePath, opacity: 1 },
    config: { tension: 180, friction: 12 },
  });

  const [activeData, setActiveData] = useState<{ x: Date; y: number } | null>(
    null
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    // Rest of the code remains the same
    const { offsetX } = event.nativeEvent;
    const xValue = xScale.invert(offsetX);
    const index = d3.bisect(
      data.map((d) => d.x),
      xValue
    );
    const active = data[index];

    if (active) {
      setActiveData(active);
      setTooltipVisible(true);
      setActiveDataCallback(active); // Call the setActiveDataCallback prop
    } else {
      setTooltipVisible(false);
      setActiveDataCallback(null);
    }
  };

  const handleMouseLeave = () => {
    // Rest of the code remains the same
    // setTooltipVisible(false);
  };

  const handleResize = () => {
    // Rest of the code remains the same
    // setChartDimensions(calculateDimensions());
  };

  const handleTouchMove = (event: React.TouchEvent<SVGSVGElement>) => {
    // Rest of the code remains the same
    const { clientX } = event.touches[0];
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const offsetX = clientX - svgRect.left;
      const xValue = xScale.invert(offsetX);
      const index = d3.bisect(
        data.map((d) => d.x),
        xValue
      );
      const active = data[index];
  
      if (active) {
        setActiveData(active);
        setTooltipVisible(true);
        setActiveDataCallback(active); // Call the setActiveDataCallback prop
      } else {
        setTooltipVisible(false);
        setActiveDataCallback(null);
      }
    }
  };
  

  const handleTouchEnd = () => {
    // Rest of the code remains the same
    setTooltipVisible(false);
    setActiveDataCallback(null);
  };

  useEffect(() => {
    // Rest of the code remains the same
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tooltipAnimation = useSpring({
    // Rest of the code remains the same
    x: xScale(activeData?.x ?? 0),
    y: yScale(activeData?.y ?? 0),
    opacity: tooltipVisible ? 1 : 0,
    config: { tension: 180, friction: 12 },
  });

  const formatDate = (date: Date) => {
    // Rest of the code remains the same
    return d3.timeFormat("%Y-%m-%d %H:%M:%S")(date);
  };
  const requiredHeight =
    yScale(d3.min(data, (d) => d.y) as number) + margin.bottom;

  return (
    // Rest of the code remains the same
    <div style={{ width: "100%", height: "190%" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${requiredHeight}`} // Update the viewBox attribute
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }} // Update the style attribute to auto for height
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <g>
          <animated.path
          d={animationProps.d as unknown as string | undefined}
            fill="none"
            stroke={color}
            strokeWidth="4"
            opacity={animationProps.opacity}
          />
          {activeData && (
            <>
              <animated.circle
                cx={tooltipAnimation.x}
                cy={tooltipAnimation.y}
                r="9"
                fill={color}
                opacity={tooltipAnimation.opacity}
              />
              {displayValues && (
                <animated.text
                  x={tooltipAnimation.x}
                  y={tooltipAnimation.y.interpolate((y) => y - 25)}
                  textAnchor="middle"
                  fontSize="14px"
                  fontWeight="bold"
                  fill="black"
                  opacity={tooltipAnimation.opacity}
                >
                  {activeData.y.toFixed(2)}
                </animated.text>
              )}
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLineChart;

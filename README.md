
# AnimaGraphs

A collection of animated graphs built using D3.js and React-Spring. This library provides components for Line, Pie, and Bar charts with smooth animations.

## Installation

```bash
npm install animagraphs
```

## Usage

### AnimatedLineChart

```jsx
import { AnimatedLineChart } from 'animagraphs';

const data = [...]; // Your line chart data
const colors = {...}; // Color customization

<AnimatedLineChart data={data} colors={colors} ...otherProps />
```

#### Props

- `data`: Array of objects with `x` (number or Date) and `y` (number) properties.
- `colors`: Object with properties `line`, `points`, `xAxis`, and `yAxis` for color customization.

### AnimatedPieChart

```jsx
import { AnimatedPieChart } from 'animagraphs';

const data = [...]; // Your pie chart data
const colors = [...]; // Array of colors

<AnimatedPieChart data={data} colors={colors} ...otherProps />
```

#### Props

- `data`: Array of objects with `label` (string) and `value` (number).
- `colors`: Array of colors for each segment of the pie.

### AnimatedBarChart

```jsx
import { AnimatedBarChart } from 'animagraphs';

const data = [...]; // Your bar chart data
const colors = {...}; // Color customization

<AnimatedBarChart data={data} colors={colors} ...otherProps />
```

#### Props

- `data`: Array of objects with `label` (string) and `value` (number).
- `colors`: Object with properties `bars`, `xAxis`, and `yAxis` for color customization.

## License

MIT

# Animagraphs

A collection of animated graphs built using D3.js and React-Spring.

Animagraphs is a library that provides a variety of animated graphs for your data visualization needs. Built with D3.js and React-Spring, these components are designed to be easy to integrate and customize within your React applications.

## Installation

```bash
npm install animagraphs
```

or

```bash
yarn add animagraphs
```

## Usage

First, import the required graph component from animagraphs:

```javascript
import { AnimatedLineChart } from 'animagraphs';
```

Next, render the graph component within your React component, passing the required props:

```javascript
<AnimatedLineChart
  points={data}
  width={800}
  height={500}
  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
  setActiveDataCallback={(data) => console.log(data)}
  color="#3f51b5"
  displayValues
/>
```

## Components

`AnimatedLineChart`
An animated line chart component that displays a line representing the relationship between data points. Supports tooltips and value display.

### Props

| Name | Type | Description |
| --- | --- | --- |
| points | `number[][]` | An array of `[x, y]` coordinates representing the data points |
| width | `number` | The width of the SVG container |
| height | `number` | The height of the SVG container |
| margin | `{ top: number; right: number; bottom: number; left: number }` | The margins around the chart |
| setActiveDataCallback | `(data: { x: Date; y: number } | null) => void` | A callback function that is called with the active data point when hovering over the chart |
| color | `string` | The color of the line and tooltips |
| displayValues | `boolean` | If `true`, display values next to the tooltips|


## Customization

Animagraphs components are designed to be customizable. You can pass custom colors and other styling options through props.


Contributing
Contributions are welcome! Please feel free to submit issues or pull requests.

License
Animagraphs is released under the MIT License.
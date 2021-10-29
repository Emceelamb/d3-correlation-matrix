import React from 'react';
import { useData } from './useData';
import { scaleBand, scaleLinear } from 'd3';
import { AxisLeft } from './components/AxisLeft'
import { AxisBottom } from './components/AxisBottom';
import { HeatMap } from './components/HeatMap';

const width = 1100;
const height = 1100;
const margin = {
  top: 100,
  right: 0,
  bottom: 0,
  left:100
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const App = () => {

  const csvUrl = "https://gist.githubusercontent.com/Emceelamb/184a627df887fc945d202c69333cb133/raw/037c58a8325d6730fbdb2eb9aa4644cd1ba14c93/correlation_matrix"

  const data = useData(csvUrl)
  if(!data) {
    return <pre>Loading...</pre>
  }

  // console.log(data.columns)


  const symbols = data["columns"].filter((sym:string) => sym!=="SYMBOL").map((sym:string)=>sym.split('_')[0].toUpperCase())

  const yScale = scaleBand()
    .domain(symbols)
    .range([0, innerHeight])

  const xScale = scaleBand()
    .domain(symbols)
    .range([0, innerWidth])


  const colorScale = scaleLinear()
    .range(["red", "green"])
    .domain([-1, 1])


  return (
    <svg width={width} height={height} transform="translate(0,0)">
      <g transform={`translate(${margin.left}, 50)`}>
        <HeatMap data={data} colorScale={colorScale}/>
      </g>
      <g transform={`translate(0, 50)`}>
        <AxisLeft yScale={yScale} />
      </g>
      <AxisBottom xScale={xScale} innerHeight={innerHeight} />
    </svg>
  );
}

export default App;

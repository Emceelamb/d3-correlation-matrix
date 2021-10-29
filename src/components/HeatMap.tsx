const HeatMap = ({data, colorScale}) => {
  return (
        data.map((d:Object, i:number)=>{
          return (
            Object.entries(d).filter(([key, _]) => key!== "SYMBOL").map((o,j)=>{
              return (
                <g key={j} transform={`translate(${i*100}, ${j*100})`}>
                  <rect
                    width={100}
                    height={100}
                    fill={colorScale(o[1])}
                  >
                  </rect>
                  <text transform={`translate(25, 50)`}>{o[1]}</text>
                </g>
              )
            })
          )
        })
  )
}

export {
  HeatMap
}

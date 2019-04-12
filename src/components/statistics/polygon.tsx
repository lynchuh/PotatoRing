import React from 'react'

interface IProps{
  dailyData: any
  width: number,
}

const Polygon = (props:IProps)=>{
  return (
    <div className="polygon" >
      <svg
        width="100%"
        height="60"
        preserveAspectRatio="none"
      >
        <polygon
          fill="rgba(215,78,78,0.1)"
          stroke="rgba(215,78,78,0.5)"
          strokeWidth="1"
          points={Polygon.getPoint(props)}
        />
      </svg>
    </div>
  )
}
Polygon.getPoint = (props:IProps)=>{
  const dates = Object.keys(props.dailyData)
  const YRange = dates.reduce((a,b)=>props.dailyData[b].length> a ? props.dailyData[b].length : a ,0)
  const {width} = props
  const XRange = new Date().getTime() - Date.parse(dates[dates.length-1])
  let lastXPoint = 0
  const points = dates.reduce((a,date)=>{
    const x = (new Date().getTime() - Date.parse(date))/ XRange * width
    const y = (1 - props.dailyData[date].length/YRange) * 60
    lastXPoint = x
    return a.concat(` ${x},${y}`)
  },'0,60')
  return points.concat(` ${lastXPoint},60`)
}

export default Polygon

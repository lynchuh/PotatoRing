import React from 'react'
import { Tooltip } from 'antd'

interface IProps{
  monthData:any
  XRange: number
  width: number
}

export default  class extends React.Component<IProps,any> {
  get points(){
    const {monthData,XRange} = this.props
    let YRange = Object.keys(monthData).reduce((a,b)=> a > monthData[b].length ? a:monthData[b].length,0)
    if(YRange === 0){
      YRange = 5
    }
    const points = Object.keys(monthData).map(date=>{
      const x = (new Date(date).getDate()-0.5) / XRange *  this.props.width
      const y = (1-monthData[date].length/YRange) * 160 +10
      return [x,y,monthData[date].length]
    })
    return points
  }

  public render(){
    return(
      <svg width='100%' height='200'>
        <rect x={0} y={0} width={this.props.width} height={170}/>
        <path d={this.points.reduce((a,b)=>a.concat(`${b.slice(0,2).join(',')},`),'M')}/>
        {this.points.map((point,index)=>(
          <text key={index} x={point[0]-5} y="200" >{index+1}</text>
        ))}
        {this.points.map((point,index)=>(
          <Tooltip key={index} placement="top" title={`${point[2]}`} overlayClassName='daily_tips'>
            <circle r="5" cx={point[0]} cy={point[1]} />
          </Tooltip>
          ))}
      </svg>
    )
  }
}

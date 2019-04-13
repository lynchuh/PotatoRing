import React from 'react'

interface IProps {
	chartData:any[]
	width: number
}

const BarChart = (props:IProps)=>(
	<div className='bar_chart'>
	<svg width='100%' height={60}>
	{BarChart.getPoints(props).map((point,index)=>(
	<rect key={index} fill="rgba(215,78,78,0.5)" x={point[0]} y={point[1]} width={16} height={60-point[1]}/>
	))}
	</svg>
	</div>
)

BarChart.getPoints = (props)=>{
	const {chartData,width}=props
	const XRange = 10
	const YRange = chartData.reduce((a,b)=>a>b.length?a:b.length,0)
	return chartData.map((item,index)=>{
		const x = (index+3)/XRange *(width)-8
		let y = (1-item.length/YRange) * 60
		if(y===60){
			y = 59
		}
		return [x,y]
	})
}
export default BarChart
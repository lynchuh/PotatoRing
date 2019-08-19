import React from 'react'
import dayJs from 'dayjs'
import { InputNumber } from 'antd'

import MonthChart from './monthChart'

interface IProps{
  caleData: any[]
  width: number
}

interface IState {
  currentMonth: string
  currentYear: string
}

export default class extends React.Component<IProps,IState>{
  constructor(props){
    super(props)
    this.state = {
      currentMonth: dayJs().format('MM'),
      currentYear : dayJs().format('YYYY')
    }
  }
  get monthData(){
    return this.props.caleData
      .filter(t=>dayJs(t.calTime).format('MM')===this.state.currentMonth)
      .filter(t=>dayJs(t.calTime).format('YYYY')===this.state.currentYear)
  }
  get averages(){
    const currentMonthDays = dayJs(`${this.state.currentYear}-${this.state.currentMonth}-1`).daysInMonth()
    return (this.monthData.length/currentMonthDays).toFixed(2)
  }
  get rate(){
    const {currentMonth,currentYear} = this.state
    const lastYear = currentMonth === '01' ? `${Number(currentYear)-1}` : currentYear
    let lastMonth = currentMonth === '01' ? '12': `${Number(currentMonth) -1}`
    if(Number(lastMonth)<10){
      lastMonth = `0${lastMonth}`
    }
    const lastNum = this.props.caleData
      .filter(t=>dayJs(t.calTime).format('MM') === lastMonth)
      .filter(t=>dayJs(t.calTime).format('YYYY') === lastYear)
      .length
    let r = ((this.monthData.length-lastNum)/lastNum).toFixed(1)
        if(Number(r)===Infinity){
          r = '1.0'
        }else if(!Number(r)){
          r = '0'
        }
    return r
  }
  get chartData(){
    const {currentYear,currentMonth} = this.state
    const newList = new Map();
    const obj ={}
    const totalDay = dayJs(`${currentYear}-${currentMonth}-1`).daysInMonth();
    [...Array(totalDay)].forEach((a,index)=>{
      const day = `${currentYear}-${currentMonth}-${index+1<10?`0${index+1}`:index+1}`
      newList.set(day,[])
    })
    this.monthData.forEach(tomato=>{
      const day = dayJs(tomato.calTime).format('YYYY-MM-DD')
      const list = newList.get(day)
      list.push(tomato)
      newList.set(day,list)
    })
    for (const [key,value] of newList){
      obj[key] = value
    }
    // 兼容性较差的做法： obj = Object.entries(newList)
    return {monthChart:obj,XRange:totalDay}
  }
	onChangeYear = (value)=> {
    if(this.state.currentYear !== `${value}`){
      this.setState({
        currentYear: `${value}`
      })
    }
  }
  onChangeMonth = (value)=>{
    const month = value > 10 ? `${value}` : `0${value}`
    if(month !== this.state.currentMonth){
      this.setState({
        currentMonth: month
      })
    }
  }
  public render(){
    const firstYear = this.props.caleData[0]?this.props.caleData[0].calTime : new Date()
    const maxMonth = Number(this.state.currentYear) === new Date().getFullYear() ? new Date().getMonth() +1 : 12
           return (
      <div className="monthly_template">
        <div className='month_action'>
          <span>当前月份：</span>
          <InputNumber defaultValue={Number(this.state.currentYear)} onChange={this.onChangeYear} max={new Date().getFullYear()} min={new Date(firstYear).getFullYear()} />
          <span>年</span>
          <InputNumber defaultValue={Number(this.state.currentMonth)} onChange={this.onChangeMonth} min={1} max={maxMonth}/>
          <span>月</span>
        </div>
        <div className="key_metrics">
          <div className='metrics_item'>
            <strong>{this.monthData.length}</strong>
            <span>总数</span>
          </div>
          <div className='metrics_item'>
            <strong>{this.averages}</strong>
            <span>日平均数</span>
          </div>
          <div className='metrics_item'>
            <strong className={Number(this.rate) >= 0 ? 'rise':'reduce'}>
              { Number(this.rate) >= 0 ? `+${this.rate}`: this.rate}
            </strong>
            <span>月增长量</span>
          </div>
        </div>
        <div className="month_chart">
          <MonthChart monthData={this.chartData.monthChart} XRange={this.chartData.XRange} width={this.props.width}/>
        </div>
      </div>
    )
  }
}

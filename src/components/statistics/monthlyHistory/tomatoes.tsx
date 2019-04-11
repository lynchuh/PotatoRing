import React from 'react'
import dayJs from 'dayjs'
import { InputNumber } from 'antd'

import MonthChart from './monthChart'

interface IProps{
  completedTomatoes: any[]
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
    return this.props.completedTomatoes
      .filter(t=>dayJs(t.started_at).format('MM')===this.state.currentMonth)
      .filter(t=>dayJs(t.started_at).format('YYYY')===this.state.currentYear)
  }
  get lastMonthData(){
    const {currentMonth,currentYear} = this.state
    let lastMonth = currentMonth === '01' ? '12': `${Number(currentMonth) -1}`
    if(Number(lastMonth)<10){
      lastMonth = `0${lastMonth}`
    }
    const lastYear = currentMonth === '01' ? `${Number(currentYear)-1}` : currentYear
    return this.props.completedTomatoes
      .filter(t=>dayJs(t.started_at).format('MM') === lastMonth)
      .filter(t=>dayJs(t.started_at).format('YYYY') === lastYear)
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
      const day = dayJs(tomato.started_at).format('YYYY-MM-DD')
      const list = newList.get(day)
      list.push(tomato)
      newList.set(day,list)
    })
    for (const [key,value] of newList){
      obj[key] = value
    }
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
    const {currentMonth,currentYear} = this.state
    const {monthData:current,lastMonthData:last} = this
    const currentMonthDays = dayJs(`${currentYear}-${currentMonth+1}-1`).daysInMonth()
    const averages = (this.monthData.length/currentMonthDays).toFixed(2)
    let rate = ((current.length-last.length)/last.length).toFixed(1)
    if(Number(rate) === Infinity ||!Number(rate)){
      rate = `0`
    }
    const firstYear = this.props.completedTomatoes[0]?this.props.completedTomatoes[0].started_at : new Date()
    const maxMonth = Number(this.state.currentYear) === new Date().getFullYear() ? new Date().getMonth() +1 : 12

    return (
      <div className="monthly_tomato">
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
            <strong>{averages}</strong>
            <span>日平均数</span>
          </div>
          <div className='metrics_item'>
            <strong className={Number(rate) >= 0 ? 'rise':'reduce'}>{ Number(rate) >= 0 ? `+${rate}`: rate}</strong>
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

import React from 'react'
import {Tabs, Pagination, Button, Tooltip} from 'antd'
import dayJs from 'dayjs'

import TomatoItem from './tomatoItem'
import AddNewTomato from './newTomato'

interface IProps {
  abortTomatoes:any[]
  dailyTomatoes:any
  AbortTomatoes: (id,params)=>(dispatch)=>Promise<any>
  AddTomatoes: (params)=>(dispatch)=>Promise<any>
}
interface IState {
  tabKey: string,
  currentPage: number,
  isShowAddPane: boolean
}
const TabPane = Tabs.TabPane

export default class extends React.PureComponent<IProps,IState>{
  constructor(props){
    super(props)
    this.state = {
      tabKey: '1',
      currentPage: 1,
      isShowAddPane: false
    }
  }
  changeTab=(tabKey)=>{
    if(tabKey !== this.state.tabKey){
      this.setState({tabKey})
    }
  }
  togglePage=(currentPage:number)=>{
    this.setState({currentPage})
  }
  get dailyHtml(){
    const week = ['周日','周一','周二','周三','周四','周五','周六']
    const {currentPage} = this.state
    const {dailyTomatoes} = this.props
    return Object.keys(dailyTomatoes).slice((currentPage-1)*3,currentPage*3).map(date=>{
      const duration = dailyTomatoes[date].reduce((a,b)=>a+(Date.parse(b.ended_at)-Date.parse(b.started_at)),0)
      const hours = Math.floor(duration/1000/60/60)
      const minutes = Math.floor(duration/1000/60%60)
      return(
      <div className='daily_tomatoes' key={date}>
        <div className="title">
          <div className='date'>
            <span className='date_time'>{dayJs(date).format('MM月DD日')}</span>
            <span className='week_day'>{week[dayJs(date).format('d')]}</span>
          </div>
          <div className='daily_statistic'>
            <span>{`完成了${dailyTomatoes[date].length }个番茄`}</span>
            <span>总计{hours?`${hours}小时`:''}{minutes?`${minutes}分钟`:''}</span>
          </div>
        </div>
        <ul className="itemlist">
          {
            dailyTomatoes[date].map(tomato=><TomatoItem key={tomato.id} {...tomato} AbortTomatoes={this.props.AbortTomatoes} />)
          }
        </ul>
      </div>
    )
    })
  }
  cancelAddPane=()=>{
    this.setState({
      isShowAddPane: false
    })
  }
  addNewTomato=(params)=>{
    this.setState({
      isShowAddPane: false
    })
    this.props.AddTomatoes(params)
  }
  public render(){
    const operations = this.state.tabKey==='1'?
        (<Tooltip title="补记番茄">
            <Button className='add_tomato' icon='plus' onClick={()=>this.setState({isShowAddPane:true})}/>
        </Tooltip>):
        null
    return (
      <div className='tomato_history'>
        <Tabs onChange={this.changeTab} type="card" tabBarExtraContent={operations}>
          <TabPane tab="完成的番茄" key="1">
            { this.state.isShowAddPane? <AddNewTomato cancelAddPane={this.cancelAddPane} addNewTomato={this.addNewTomato}/> :null}
            {this.dailyHtml}
            <div className='Pagination_wrapper'>
              <Pagination
                size="small"
                defaultCurrent={1}
                pageSize={3}
                hideOnSinglePage={true}
                total={Object.keys(this.props.dailyTomatoes).length}
                current={this.state.currentPage}
                onChange={this.togglePage}/>
              <span className='tips'>
                总计{Object.keys(this.props.dailyTomatoes)
                    .reduce((a,b)=>a+this.props.dailyTomatoes[b].length,0)
                }个任务
              </span>
            </div>
          </TabPane>
          <TabPane tab="打断记录" key="2">
            <ul className='itemlist'>
              {
                this.props.abortTomatoes.map(tomato=><TomatoItem key={tomato.id} {...tomato} AbortTomatoes={this.props.AbortTomatoes}/>)
              }
            </ul>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

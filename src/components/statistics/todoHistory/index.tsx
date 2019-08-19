import React from 'react'
import { Tabs,Pagination } from 'antd'
import dayJs from 'dayjs'
import TodoList from './todoList'
import DeletedTodos from './deletedTodos'

interface IProps {
  deletedTodos:any[]
  dailyTodos:any
  UpdateTodo: (id,params)=>void
  CompletedTodo: (id,params)=>void
}
const TabPane = Tabs.TabPane;

export default class extends React.PureComponent<IProps,any>{
  constructor(props){
    super(props)
    this.state = {
      tabKey: "1",
      currentPage: 1
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
    const {dailyTodos} = this.props
    return Object.keys(dailyTodos).slice((currentPage-1)*3,currentPage*3).map(date=>(
      <div className='daily_todos' key={date}>
        <div className="title">
          <div className='date'>
            <span className='date_time'>{dayJs(date).format('MM月DD日')}</span>
            <span className='week_day'>{week[dayJs(date).format('d')]}</span>
          </div>
          <span className='desc'>{`完成了${dailyTodos[date].length }个任务`}</span>
        </div>
        <TodoList
          list={dailyTodos[date]}
          recoverAction={this.turnToUncompleted}
          deleteAction={this.props.UpdateTodo}
        />
      </div>
    ))
  }
  turnToUncompleted=(item)=>{
    this.props.CompletedTodo(item.id,{completed:false})
  }
  turnToUnDeleted=(item)=>{
    this.props.UpdateTodo(item.id,{deleted:false})
  }
  public render(){
    return (
      <div className='todo_history'>
        <Tabs onChange={this.changeTab} type="card">
          <TabPane tab="已完成的任务" key="1">
            {this.dailyHtml}
            <div className='Pagination_wrapper'>
              <Pagination
                size="small"
                defaultCurrent={1}
                pageSize={3}
                hideOnSinglePage={true}
                total={Object.keys(this.props.dailyTodos).length}
                current={this.state.currentPage}
                onChange={this.togglePage}/>
              <span className='tips'>
                总计{
                  Object.keys(this.props.dailyTodos)
                    .reduce((a,b)=>a+this.props.dailyTodos[b].length,0)
                }个任务
              </span>
            </div>
          </TabPane>
          <TabPane tab="已删除的任务" key="2">
            <DeletedTodos todos={this.props.deletedTodos} turnToUnDeleted={this.turnToUnDeleted}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

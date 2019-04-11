import React from 'react'
import dayJs from 'dayjs'

import Polygon from './polygon'
import TodoHistory from './todoHistory'
import TomatoHistory from './tomatoHistory'
import MonthlyHistory from './monthlyHistory'

import './index.scss'

interface IProps{
  tomatoes: any[]
  todos: any[]
  UpdateTodo: (id,params)=>(dispatch)=>Promise<any>
  CompletedTodo: (id,params)=>(dispatch)=>Promise<any>
  AbortTomatoes: (id,params)=>(dispatch)=>Promise<any>
  AddTomatoes: (params)=>(dispatch)=>Promise<any>
}


class Statistics extends React.Component<IProps,any>{
  liNode: HTMLLIElement | null;
  ulNode: HTMLUListElement | null;
  constructor(props){
    super(props)
    this.state = {
      activeId: -1,
      liWidth: this.liNode?this.liNode.offsetWidth-2 : 0,
      ulWidth: this.ulNode?this.ulNode.offsetWidth-2 :0
    }
    this.updateSize = this.updateSize.bind(this)
  }
  get completedTodos(){
    return this.props.todos.filter(todo=>todo.completed && !todo.deleted)
  }
  get completedTomatoes(){
    return this.props.tomatoes.filter(tomato=>!tomato.aborted).filter(tomato=> tomato.description && tomato.ended_at).sort((a,b)=>Date.parse(a.started_at)-Date.parse(b.started_at))
  }
  get dailyTomatoes(){
    const newList = new Map()
    const dailyTomatoes = {}
    this.completedTomatoes
      .sort((a,b)=>Date.parse(b.started_at)-Date.parse(a.started_at))
      .forEach(tomato=>{
        const day = dayJs(tomato.started_at).format('YYYY-MM-DD')
        const list = newList.get(day)||[]
        list.push(tomato)
        newList.set(day,list)
      })
    for(const [key,value] of newList.entries()){
      dailyTomatoes[key] = value
    }
    return dailyTomatoes
  }
  get dailyTodos(){
    const newList = new Map()
    const dailyTodos = {}
    this.completedTodos
      .sort((a,b)=>Date.parse(b.completed_at)-Date.parse(a.completed_at))
      .forEach(todo=>{
      const day = dayJs(todo.completed_at).format('YYYY-MM-DD')
      const list =newList.get(day) || []
      list.push(todo)
      newList.set(day,list)
    })
    for(const [key,value] of newList.entries()){
      dailyTodos[key] = value
    }
    return dailyTodos
  }
  toggleActivePane(index){
    if(this.state.activeId!==index){
      this.setState({
        activeId: index
      })
    }
  }
  updateSize(){
    const liWidth = this.liNode? this.liNode.offsetWidth-2: 0
    const ulWidth = this.ulNode? this.ulNode.offsetWidth-2: 0
    if(this.state.liWidth !==liWidth){this.setState({ liWidth })}
    if(this.state.ulWidth !==ulWidth){this.setState({ ulWidth })}
  }
  componentDidMount(){
    this.updateSize()
    window.addEventListener('resize', this.updateSize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updateSize);
  }
  public render(){
    return (
      <main id='statistics'>
        <ul className='graph' ref={ulNode=>this.ulNode = ulNode}>
          <li className={this.state.activeId === 0 ? 'active': '' } onClick={this.toggleActivePane.bind(this,0)}>
            <div className='desc'>
              <span className="title">统计</span>
              <span className='subtitle'>{new Date().getMonth()+1}月累积</span>
              <span className='quantity'>{this.completedTomatoes.filter(t=>new Date(t.started_at).getMonth()===new Date().getMonth()).length}</span>
            </div>
            {this.completedTomatoes.length !==0 ?
              <Polygon
                dailyData={this.dailyTomatoes}
                width={this.state.liWidth}
              />
              : null}
          </li>
          <li ref={li=>this.liNode=li} className={this.state.activeId === 1 ? 'active': '' } onClick={this.toggleActivePane.bind(this,1)}>
            <div className='desc'>
              <span className="title">番茄历史</span>
              <span className='subtitle'>累计完成番茄</span>
              <span className='quantity'>{this.completedTomatoes.length}</span>
            </div>
            {this.completedTomatoes.length !==0 ?
              <Polygon
                dailyData={this.dailyTomatoes}
                width={this.state.liWidth}
              />
              : null}
          </li>
          <li className={this.state.activeId === 2 ? 'active': '' } onClick={this.toggleActivePane.bind(this,2)}>
            <div className='desc'>
              <span className="title">任务历史</span>
              <span className='subtitle'>累计完成任务</span>
              <span className='quantity'>{this.completedTodos.length}</span>
            </div>
            {this.completedTodos.length !==0 ?
              <Polygon
                dailyData={this.dailyTodos}
                width={this.state.liWidth}
                />
              : null}
          </li>
        </ul>
        {/*{this.state.activeId=== 0 ?*/}
          < MonthlyHistory
             completedTodos = {this.completedTodos}
             completedTomatoes = {this.completedTomatoes}
             width ={this.state.ulWidth - 64 }
          />
          {/*: null*/}
        {/*}*/}
        {this.state.activeId=== 1 ?
          <TomatoHistory
            dailyTomatoes = {this.dailyTomatoes}
            abortTomatoes={this.props.tomatoes.filter(tomato=>tomato.aborted && !tomato.description)}
            AbortTomatoes = {this.props.AbortTomatoes}
            AddTomatoes = {this.props.AddTomatoes}
          />
          : null
        }
        {this.state.activeId=== 2 ?
          <TodoHistory
            deletedTodos={this.props.todos.filter(todo=>todo.deleted)}
            dailyTodos = {this.dailyTodos}
            UpdateTodo = {this.props.UpdateTodo}
            CompletedTodo = {this.props.CompletedTodo}
          />
          : null
        }

      </main>
    )
  }
}

export default Statistics

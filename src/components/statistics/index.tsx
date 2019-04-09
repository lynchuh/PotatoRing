import React from 'react'
import dayJs from 'dayjs'

import Polygon from './polygon'
import TodoHistory from './todoHistory'

import './index.scss'

interface IProps{
  tomatoes: any[]
  todos: any[]
}


class Statistics extends React.Component<IProps,any>{
  liNode: HTMLLIElement | null;
  get completedTodos(){
    return this.props.todos.filter(todo=>todo.completed && !todo.deleted)
  }
  get completedTomatoes(){
    return this.props.tomatoes.filter(tomato=>!tomato.aborted).filter(tomato=> tomato.description && tomato.ended_at)
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
  constructor(props){
    super(props)
    this.state = {
      activeId: -1
    }
  }
  toggleActivePane(index){
    if(this.state.activeId!==index){
      this.setState({
        activeId: index
      })
    }
  }

  public render(){
    return (
      <div className='container' id='statistics'>
        <ul>
          <li ref={li=>this.liNode=li} className={this.state.activeId === 0 ? 'active': '' } onClick={this.toggleActivePane.bind(this,0)}>
            <div className='desc'>
              <span className="title">番茄历史</span>
              <span className='subtitle'>累计完成番茄</span>
              <span className='quantity'>{this.completedTomatoes.length}</span>
            </div>
            {this.completedTomatoes.length !==0 ?
              <Polygon
                dailyData={this.dailyTomatoes}
                width={this.liNode ? this.liNode.offsetWidth-2 : 0}
                YRange ={this.completedTomatoes.length}
              />
              : null}
          </li>
          <li className={this.state.activeId === 1 ? 'active': '' } onClick={this.toggleActivePane.bind(this,1)}>
            <div className='desc'>
              <span className="title">任务历史</span>
              <span className='subtitle'>累计完成任务</span>
              <span className='quantity'>{this.completedTodos.length}</span>
            </div>
            {this.completedTodos.length !==0 ?
              <Polygon
                dailyData={this.dailyTodos}
                width={this.liNode ? this.liNode.offsetWidth-2 : 0}
                YRange ={this.completedTodos.length}
                />
              : null}
          </li>
        </ul>
        <TodoHistory todos={this.props.todos}/>
        {/* {this.state.activeId=== 0 ?
          <div>
            番茄
          </div>
          : null
        }
        {this.state.activeId=== 1 ?
          <div>
            任务
          </div>
          : null
        } */}
      </div>
    )
  }
}

export default Statistics

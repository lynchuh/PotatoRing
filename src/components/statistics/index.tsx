import React from 'react'
import dayJs from 'dayjs'

import Polygon from './polygon'

import './index.scss'

interface IProps{
  tomatoes: any[]
  todos: any[]
}


class Statistics extends React.Component<IProps,any>{
  liNode: HTMLLIElement | null;
  get completedTodos(){
    return this.props.todos.filter(todo=>todo.completed)
  }
  get completedTomatoes(){
    return this.props.tomatoes.filter(tomato=>!tomato.aborted).filter(tomato=> tomato.description && tomato.ended_at)
  }
  get dayliyTomatoes(){
    const newList = new Map()
    const dayliyTomatoes = {}
    this.completedTomatoes
      .sort((a,b)=>Date.parse(b.started_at)-Date.parse(a.started_at))
      .forEach(tomato=>{
        const day = dayJs(tomato.started_at).format('YYYY-MM-DD')
        const list = newList.get(day)||[]
        list.push(tomato)
        newList.set(day,list)
      })
    for(const [key,value] of newList.entries()){
      dayliyTomatoes[key] = value
    }
    return dayliyTomatoes
  }
  get dayliyTodos(){
    const newList = new Map()
    const dayliyTodos = {}
    this.completedTodos
      .sort((a,b)=>Date.parse(b.completed_at)-Date.parse(a.completed_at))
      .forEach(todo=>{
      const day = dayJs(todo.completed_at).format('YYYY-MM-DD')
      const list =newList.get(day) || []
      list.push(todo)
      newList.set(day,list)
    })
    for(const [key,value] of newList.entries()){
      dayliyTodos[key] = value
    }
    return dayliyTodos
  }
  public render(){
    return (
      <div className='container' id='statistics'>
        <ul>
          <li>
            <span className='title'>统计</span>
          </li>
          <li>
            <span className="title">目标</span>
          </li>
          <li>
            <div className='desc'>
              <span className="title">番茄历史</span>
              <span className='subtitle'>累计完成番茄</span>
              <span className='quantity'>{this.completedTomatoes.length}</span>
            </div>
            {this.completedTomatoes.length !==0 ?
              <Polygon
                dayliyData={this.dayliyTomatoes}
                width={this.liNode ? this.liNode.offsetWidth-2 : 0}
                YRange ={this.completedTomatoes.length}
              />
              : null}
          </li>
          <li ref={li=>this.liNode=li}>
            <div className='desc'>
              <span className="title">任务历史</span>
              <span className='subtitle'>累计完成任务</span>
              <span className='quantity'>{this.completedTodos.length}</span>
            </div>
            {this.completedTodos.length !==0 ?
              <Polygon
                dayliyData={this.dayliyTodos}
                width={this.liNode ? this.liNode.offsetWidth-2 : 0}
                YRange ={this.completedTodos.length}
                />
              : null}
          </li>
        </ul>
      </div>
    )
  }
}

export default Statistics

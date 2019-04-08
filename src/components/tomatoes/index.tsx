import React from 'react'

import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'

import './index.scss'

export default class extends React.Component<any,any>{
  get unfinishedTomato(){
    return this.props.tomatoes.filter(tomato=>!tomato.aborted && !tomato.description && !tomato.ended_at)[0]
  }
  get finishedTomato(){
    return (this.props.tomatoes
      .filter(tomato=> !tomato.aborted && tomato.description && tomato.ended_at)
      .slice(0,8))
  }
  render(){
    return (
      <div className="content" id="tomatos">
        <TomatoAction
          abortTomato={this.props.AbortTomatoes}
          addTomato = {this.props.AddTomatoes}
          changeTomaoDesc = {this.props.ChangeTomaoDesc}
          unfinishedTomato = {this.unfinishedTomato}
          description = {this.props.description}
        />
        <TomatoList finishedTomato ={this.finishedTomato}/>
      </div>
    )
  }
}

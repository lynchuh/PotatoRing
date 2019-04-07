import React from 'react'

import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'

import './index.scss'

export default class extends React.Component<any,any>{
  get unfinishedTomato(){
    const unAborted = this.props.tomatoes.filter(tomato=>!tomato.aborted)
    return unAborted.filter(tomato=>!tomato.description && !tomato.ended_at)[0]
  }
  get finishedTomato(){
    const unAborted = this.props.tomatoes.filter(tomato=>!tomato.aborted)
    return unAborted.filter(tomato=> tomato.description && tomato.ended_at)
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

import React from 'react'
import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'

import './index.scss'

export default (props)=>{
  const unfinishedTomato = props.tomatoes
    .filter(tomato=>!tomato.aborted && !tomato.description && !tomato.ended_at)[0]
  const finishedTomato = props.tomatoes
    .filter(tomato=> !tomato.aborted && tomato.description && tomato.ended_at)
    .slice(0,8)
  return (
    <div className="content" id="tomatos">
      <TomatoAction
        abortTomato={props.AbortTomatoes}
        addTomato = {props.AddTomatoes}
        changeTomaoDesc = {props.ChangeTomaoDesc}
        unfinishedTomato = {unfinishedTomato}
        description = {props.description}
      />
      <TomatoList finishedTomato ={finishedTomato}/>
    </div>
  )
}

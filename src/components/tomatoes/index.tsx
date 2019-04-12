import React from 'react'
import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'

import './index.scss'

interface IProps {
  AddTomatoes: (params)=>(dispatch)=>Promise<any>
  UpdateTomato: (id,params)=>(dispatch)=>Promise<any>
  ChangeTomatoDesc:(des:string)=>any
  tomatoes: any[]
  description: string
}

export default (props:IProps)=>{
  const unfinishedTomato = props.tomatoes
    .filter(tomato=>!tomato.aborted && !tomato.description && !tomato.ended_at)[0]
  const finishedTomato = props.tomatoes
    .filter(tomato=> !tomato.aborted && tomato.description && tomato.ended_at)
    .slice(0,8)
  return (
    <div className="content" id="tomatoes">
      <TomatoAction
        updateTomato={props.UpdateTomato}
        addTomato = {props.AddTomatoes}
        ChangeTomatoDesc = {props.ChangeTomatoDesc}
        unfinishedTomato = {unfinishedTomato}
        description = {props.description}
      />
      <TomatoList finishedTomato ={finishedTomato}/>
    </div>
  )
}

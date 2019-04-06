import React from 'react'
import { connect } from 'react-redux'

import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'
import { AbortTomatoes,FetchTomatoes, AddTomatoes } from 'src/store/tomatoes/action'

import './index.scss'

interface IProps{
  FetchTomatoes: ()=>void,
  AbortTomatoes: (id:number,params:any)=>void,
  AddTomatoes: (params:any)=>void,
  tomatoes: any[],
  todos:any[]
}


const mapStateToProps =({Tomato,Todo})=>({...Tomato,todos:Todo.todos})
const mapDispatchToProps = {
  AbortTomatoes,
  AddTomatoes,
  FetchTomatoes
}

class Tomatoes extends React.Component<IProps,any>{
  componentDidMount(){
    this.props.FetchTomatoes()
  }
  get unfinishedTomato(){
    const unAborted = this.props.tomatoes.filter(tomato=>!tomato.aborted)
    return unAborted.filter(tomato=>!tomato.description && !tomato.ended_at)[0]
  }
  get finishedTomato(){
    const unAborted = this.props.tomatoes.filter(tomato=>!tomato.aborted)
    return unAborted.filter(tomato=> tomato.description && tomato.ended_at)
  }
  get currentCompletedTodo(){
    if(this.unfinishedTomato){
      return this.props.todos.filter(todo=>new Date(todo.completed_at).getTime() > new Date(this.unfinishedTomato.started_at).getTime())
        .sort((a,b)=>new Date(b.completed_at).getTime()- new Date(a.completed_at).getTime())
    }
    return []
  }
  render(){
    return (
      <div className="content" id="tomatos">
        <TomatoAction
          abortTomato={this.props.AbortTomatoes}
          addTomato = {this.props.AddTomatoes}
          unfinishedTomato = {this.unfinishedTomato}
          currentCompletedTodo = {this.currentCompletedTodo}
        />
        <TomatoList finishedTomato ={this.finishedTomato}/>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)

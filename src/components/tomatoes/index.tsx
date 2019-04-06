import React from 'react'
import { connect } from 'react-redux'

import TomatoAction  from './tomatoAction'
import TomatoList from './tomatoList'
import { AbortTomatoes,FetchTomatoes, AddTomatoes,ChangeTomaoDesc } from 'src/store/tomatoes/action'

import './index.scss'

interface IProps{
  FetchTomatoes: ()=>void,
  AbortTomatoes: (id:number,params:any)=>void,
  AddTomatoes: (params:any)=>void,
  ChangeTomaoDesc:(desc)=>any
  tomatoes: any[],
  description: string
}


const mapStateToProps =({Tomato})=>({...Tomato})
const mapDispatchToProps = {
  AbortTomatoes,
  AddTomatoes,
  FetchTomatoes,
  ChangeTomaoDesc
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

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)

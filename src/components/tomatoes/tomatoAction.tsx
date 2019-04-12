import React,{Fragment} from 'react'
import {Button, Input,Icon, Modal} from 'antd'
import classNames from 'classnames'
import CountDown from './countDown'

const confirm = Modal.confirm

interface IState{
  isFinished: boolean
}
interface IProps{
  updateTomato:(id,params)=>(dispatch)=>Promise<any>
  addTomato:(params)=>(dispatch)=>Promise<any>
  ChangeTomatoDesc:(desc)=>any
  description: string,
  unfinishedTomato: any,
}

export default class extends React.Component<IProps,IState>{
  constructor(props){
    super(props)
    this.state = {
      isFinished: false
    }
  }
  get html(){
    if(!this.props.unfinishedTomato){ // 没有未完成的番茄
      return (<Button className='startButton' onClick={()=>this.props.addTomato({duration:1500000})}>开始番茄</Button>)
    }
    const {duration,created_at,id} = this.props.unfinishedTomato
    const start = Date.parse(created_at)
    const current = new Date().getTime()
    const suffix = <Icon type="enter"
      onClick={()=>this.props.updateTomato(id,{description:this.props.description,ended_at: new Date()})}
      className={classNames({show:this.props.description}) }/>

    if(current-start>=duration || this.state.isFinished){ // 已经完成倒计时了
      return (
        <Fragment>
          <Input
            className='descInput'
            placeholder='刚刚完成了什么工作呢？'
            suffix={suffix}
            value={this.props.description}
            onChange={(e)=>this.props.ChangeTomatoDesc(e.target.value)}
            onPressEnter={()=>this.props.updateTomato(id,{description:this.props.description,ended_at: new Date()})}
            />
          <Icon type="close-circle" onClick={()=>this.showConfirm(id)}/>
        </Fragment>
      )
    }
    return (// 仍在倒时中
      <Fragment>
        <CountDown timer={duration-current+start} onFinished={this.onFinishCount} duration={duration}/>
        <Icon  type="close-circle" onClick={()=>this.showConfirm(id)}/>
      </Fragment>
    )
  }
  showConfirm=(id:number)=>{
    confirm({
      title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
      onOk:()=>{
        this.props.updateTomato(id,{aborted:true})
      },
      okText: '确认',
      cancelText: '取消'
    })
  }
  onFinishCount = ()=>{
    this.setState({
      isFinished: true
    })
  }
  render(){
    return(
      <div className="tomato_action">
          { this.html }
      </div>
    )
  }
}

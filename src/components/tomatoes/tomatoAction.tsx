import React,{Fragment} from 'react'
import {Button, Input,Icon, Modal} from 'antd'
import classNames from 'classnames'
import CountDown from './countDown'

const confirm = Modal.confirm

interface IState{
  description: string,
  isFinished: boolean
}
interface IProps{
  abortTomato:(id:number,params:any)=>void,
  addTomato:(params)=>void
  unfinishedTomato: any,
}
export default class TomatoAction extends React.Component<IProps,IState>{
  constructor(props){
    super(props)
    this.state = {
      description:'',
      isFinished: false
    }
  }
  get html(){
    if(!this.props.unfinishedTomato){ // 没有未完成的番茄
      return (<Button className='startButton' onClick={()=>this.props.addTomato({duration:1500000})}>开始番茄</Button>)
    }
    const {duration,created_at,id} = this.props.unfinishedTomato
    const start = new Date(created_at).getTime()
    const current = new Date().getTime()
    const suffix = <Icon type="enter"
      onClick={()=>this.props.abortTomato(id,{description:this.state.description,ended_at: new Date()})}
      className={classNames({show:this.state.description}) }/>

    if(current-start>=duration || this.state.isFinished){ // 已经完成倒计时了
      return (
        <Fragment>
          <Input
            className='descInput'
            placeholder='刚刚完成了什么工作呢？'
            suffix={suffix}
            value={this.state.description}
            onChange={this.changeDesc}
            onPressEnter={()=>this.props.abortTomato(id,{description:this.state.description,ended_at: new Date()})}
            />
          <Icon type="close-circle" onClick={()=>this.showConfirm(id)}/>
        </Fragment>
      )
    }
    return (// 仍在倒时中
      <Fragment>
        <CountDown timer={duration-current+start} onFinished={this.onFinishCout}/>
        <Icon  type="close-circle" onClick={()=>this.showConfirm(id)}/>
      </Fragment>
    )
  }
  changeDesc=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      description: e.target.value
    })
  }
  closeRest=()=>{
    this.setState({
      isFinished: false
    })
  }
  showConfirm=(id:number)=>{
    confirm({
      content: '你确定要取消这个番茄闹钟吗？',
      onOk:()=>{
        this.props.abortTomato(id,{aborted:true})
      },
      title:'confirm',
    })
  }
  onFinishCout = ()=>{
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

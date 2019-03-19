import React from 'react'
import {Input,Icon} from 'antd'


interface Istate{
  description: string,
  showEnterIcon: boolean
}

interface IProps {
  addTodo: (description:string)=>void
}

export default class extends React.Component<IProps,Istate>{
  constructor(props){
    super(props)
    this.state = {
      description:'',
      showEnterIcon: false
    }
  }
  changeTodo = (e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      description: e.target.value
    })
  }
  onPressEnter = (event:React.KeyboardEvent<EventTarget>)=>{
    if(event.key==='Enter'){
      this.addTodo()
    }
  }
  addTodo=()=>{
    const {description}= this.state
    this.props.addTodo(description)
    this.setState({
      description:''
    })
  }
  showIcon = ()=>{
    this.setState({
      showEnterIcon: true
    })
  }
  hideIcon = ()=>{
    this.setState({
      showEnterIcon: false
    })
  }
  public render(){
    const {description,showEnterIcon} = this.state
    const suffix = <Icon type="enter" onClick={()=>this.addTodo()} className={description ||showEnterIcon ?'icon show' : 'icon' }/>
    return(
      <React.Fragment>
        <Input className='addTodo' placeholder='添加新任务'
          suffix={suffix}
          value={this.state.description}
          onChange={this.changeTodo}
          onPressEnter={this.onPressEnter}
          onFocus = { this.showIcon }
          onBlur = { this.hideIcon }
          />
      </React.Fragment>
    )
  }
}

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
  updateTodo= (event:React.KeyboardEvent<EventTarget>)=>{
    if(event.key==='Enter'){
      const {description}= this.state
      this.props.addTodo(description)
    }
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
  render(){
    const {description,showEnterIcon} = this.state
    const suffix = <Icon type="enter" onClick={()=>this.props.addTodo(description)} className={description ||showEnterIcon ?'icon show' : 'icon' }/>
    return(
      <React.Fragment>
        <Input className='addTodo' placeholder='添加新任务'
          suffix={suffix}
          value={this.state.description}
          onChange={this.changeTodo}
          onKeyPress={this.updateTodo}
          onFocus = { this.showIcon }
          onBlur = { this.hideIcon }
          />
      </React.Fragment>
    )
  }
}

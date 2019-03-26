import React from 'react'
import classNames from 'classnames'
import {Input,Icon} from 'antd'

interface Istate{
  showEnterIcon: boolean,
}

interface IProps {
  AddTodo: (description:string)=>void,
  ChangeNewDesc: (desc:string)=>void,
  description: string
}

export default class NewTodo extends React.Component<IProps,Istate>{
  constructor(props){
    super(props)
    this.state = {
      showEnterIcon: false
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
  public render(){
    const {showEnterIcon} = this.state
    const {description} = this.props
    const suffix = <Icon type="enter" onClick={()=>this.props.AddTodo(description)} className={classNames('icon',{show:description ||showEnterIcon}) }/>
    return(
      <React.Fragment>
        <Input className='addTodo' placeholder='添加新任务'
          suffix={suffix}
          value={description}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>this.props.ChangeNewDesc(e.target.value)}
          onPressEnter={()=>this.props.AddTodo(description)}
          onFocus = { this.showIcon }
          onBlur = { this.hideIcon }
          />
      </React.Fragment>
    )
  }
}

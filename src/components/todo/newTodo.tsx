import React from 'react'
import classNames from 'classnames'
import {Input,Icon} from 'antd'

interface IState{
  showEnterIcon: boolean,
}

interface IProps {
  AddTodo: (params)=>(dispatch)=>Promise<any>
  ChangeNewTodoDesc: (desc:string)=>any,
  description: string
}

export default class extends React.Component<IProps,IState>{
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
    const suffix = <Icon type="enter" onClick={()=>this.props.AddTodo({description})} className={classNames('icon',{show:description ||showEnterIcon}) }/>
    return(
      <React.Fragment>
        <Input className='addTodo' placeholder='添加新任务'
          suffix={suffix}
          value={description}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>this.props.ChangeNewTodoDesc(e.target.value)}
          onPressEnter={()=>this.props.AddTodo({description})}
          onFocus = { this.showIcon }
          onBlur = { this.hideIcon }
          />
      </React.Fragment>
    )
  }
}

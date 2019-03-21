import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {Input,Icon} from 'antd'

import { AddTodo, ChangeNewDesc } from 'src/store/todoReducer/actions'

interface Istate{
  showEnterIcon: boolean,
}

interface IProps {
  addTodo: (description:string)=>void,
  changeNewDesc: (desc:string)=>void,
  description: string
}

const mapStateToProps = ({Todo})=>({description:Todo.newDescription})

const mapDispatchToProps = dispatch=>({
  addTodo:(description:string)=>dispatch(AddTodo({description})),
  changeNewDesc: (description:string)=>dispatch(ChangeNewDesc(description))
})

class NewTodo extends React.Component<IProps,Istate>{
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
    const suffix = <Icon type="enter" onClick={()=>this.props.addTodo(description)} className={classNames('icon',{show:description ||showEnterIcon}) }/>
    return(
      <React.Fragment>
        <Input className='addTodo' placeholder='添加新任务'
          suffix={suffix}
          value={description}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>this.props.changeNewDesc(e.target.value)}
          onPressEnter={()=>this.props.addTodo(description)}
          onFocus = { this.showIcon }
          onBlur = { this.hideIcon }
          />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewTodo)

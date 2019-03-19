import React from 'react'
import { Checkbox,Input,Icon } from 'antd'
import classNames from 'classnames'

interface IProps{
  description:string,
  id: number,
  deleted: boolean,
  completed: boolean,
  editingId: number,
  toEditing:(id:number)=>void,
  update:(id:number,params:any)=>void,
}

interface IState{
  description: string
}

export default class extends React.Component<IProps,IState>{
  constructor(props){
    super(props)
    this.state = {
      description: this.props.description
    }
  }
  toggleEdit=(e:React.SyntheticEvent<EventTarget>)=>{
    e.preventDefault()
    this.props.toEditing(this.props.id)
  }
  changeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      description:e.target.value
    })
  }
  public render(){
    const {id,editingId,description,completed} = this.props
    return(
      <div className={classNames('todoItem',{edit:editingId===id,completed})} >
        <Checkbox
          checked={completed}
          onChange={()=>this.props.update(id,{completed:!completed})}
        />
        <Input
          className="description"
          readOnly={editingId!==id}
          onDoubleClick={this.toggleEdit}
          onChange={this.changeInput}
          onPressEnter={()=>this.props.update(id,{description:this.state.description})}
          defaultValue={description} />
        <div className="iconlist">
          <Icon type='enter' onClick={()=>this.props.update(id,{description:this.state.description})}/>
          <Icon type="delete" theme="filled"  onClick={()=>this.props.update(id,{deleted:true})}/>
        </div>
      </div>
    )
  }
}

import React from 'react'
import { Checkbox,Input,Icon } from 'antd'
import classNames from 'classnames'


interface IProps{
  description:string
  id: number
  completed: boolean
  editingId: number
  updateTodo:(id:number,params)=>(dispatch)=>Promise<any>
  toggleEditId:(id:number)=>any
  completedTodo:(id:number,params)=>(dispatch)=>Promise<any>
}

interface IState{
  description: string
}

export default class extends React.Component<IProps,IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      description: this.props.description
    }
  }
  toggleEdit=(e:React.SyntheticEvent<EventTarget>)=>{
    e.preventDefault()
    this.props.toggleEditId(this.props.id)
  }
  changeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      description:e.target.value
    })
  }
  updateTodo(id:number,params:any){
    if('description' in params && this.props.editingId=== -1){
      return
    }
    this.props.updateTodo(id,params)
  }
  public render(){
    const {id,editingId,description,completed} = this.props
    return(
      <div className={classNames('todo_item',{edit:editingId===id,completed})} >
        <Checkbox
          checked={completed}
          onChange={()=>this.props.completedTodo(id,{completed:!completed,completed_at: new Date()})}
        />
        <Input
          className="description"
          readOnly={editingId!==id}
          onDoubleClick={this.toggleEdit}
          onChange={this.changeInput}
          onPressEnter={()=>this.updateTodo(id,{description:this.state.description})}
          defaultValue={description} />
        <div className="iconlist">
          <Icon type='enter' onClick={()=>this.updateTodo(id,{description:this.state.description})}/>
          <Icon type="delete" theme="filled"  onClick={()=>this.updateTodo(id,{deleted:true})}/>
        </div>
      </div>
    )
  }
}

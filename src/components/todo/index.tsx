import React from 'react'
import NewTodo from './newTodo'
import { Collapse,Icon } from 'antd';
import TodoItem from './todoItem'
import { connect } from 'react-redux'

import {FetchTodo,AddTodo, ChangeNewDesc, ToggleEditId, UpdateTodo, CompletedTodo} from 'src/store/todos/actions'

import './index.scss'

interface IConnectProps {
  todos:any,
  description: string,
  editingId: number,
  AddTodo: (params)=>void,
  ChangeNewDesc: ()=>void,
  FetchTodo: ()=>void,
  ToggleEditId: ()=>void,
  UpdateTodo: ()=>void,
  CompletedTodo: ()=>void
}

const {Panel} = Collapse
const getExtra = () => (
  <Icon
    type="close-circle"
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
      console.log('clean')
    }}
  />
);

const mapStateToProps = ({Todo})=>({todos:Todo.todos,description:Todo.newDescription,editingId:Todo.editingId})
const mapDispatchToProps = {
  AddTodo,
  ChangeNewDesc,
  FetchTodo,
  ToggleEditId,
  UpdateTodo,
  CompletedTodo
}

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<any,any>{
  static defaultProps: IConnectProps
  constructor(props){
    super(props)
  }
  get completedTodos(){
    return this.props.todos.filter(todo=>!todo.deleted).filter(todo=>todo.completed)
  }
  get unCompletedTodos(){
    return this.props.todos.filter(todo=>!todo.deleted).filter(todo=>!todo.completed)
  }
  componentDidMount (){
    this.props.FetchTodo()
  }
  public render(){
    return(
      <div id="todo" className='content'>
        <NewTodo
          AddTodo={this.props.AddTodo}
          ChangeNewDesc= {this.props.ChangeNewDesc}
          description = {this.props.description}
        />
        <div className="todolist">
          {
            this.unCompletedTodos.map(item=>(
              <TodoItem
                key={item.id}
                description={item.description}
                id={item.id}
                completed={item.completed}
                editingId={this.props.editingId}
                updateTodo = {this.props.UpdateTodo}
                toggleEditId={this.props.ToggleEditId}
                completedTodo = {this.props.CompletedTodo}
              />
            ))
          }
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="最近完成任务" key="1" extra={getExtra()}>
            {
              this.completedTodos.map(item=>(
                <TodoItem
                  key={item.id}
                  description={item.description}
                  id={item.id}
                  completed={item.completed}
                  editingId={this.props.editingId}
                  updateTodo = {this.props.UpdateTodo}
                  toggleEditId={this.props.ToggleEditId}
                  completedTodo ={this.props.CompletedTodo}
                />
              ))
            }
            </Panel>
          </Collapse>

        </div>
      </div>
    )
  }
}




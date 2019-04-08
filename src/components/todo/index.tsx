import React from 'react'
import NewTodo from './newTodo'
import { Collapse,Icon,Empty } from 'antd';
import TodoItem from './todoItem'

import './index.scss'

interface IConnectProps {
  todos:any,
  newDescription: string,
  editingId: number,
  AddTodo: (params)=>void,
  ChangeNewTodoDesc: ()=>void,
  ToggleEditId: ()=>void,
  UpdateTodo: ()=>void,
  CompletedTodo: ()=>void
}

const {Panel} = Collapse
const getExtra = () => (
  <Icon
    type="close-circle"
    onClick={(event) => {
      event.stopPropagation();
      console.log('clean')
    }}
  />
);


export default class extends React.Component<IConnectProps,any>{
  constructor(props){
    super(props)
  }
  get completedTodos(){
    return this.props.todos.filter(todo=>!todo.deleted).filter(todo=>todo.completed)
  }
  get unCompletedTodos(){
    return this.props.todos.filter(todo=>!todo.deleted).filter(todo=>!todo.completed)
  }
  public render(){
    return(
      <div id="todo" className='content'>
        <NewTodo
          AddTodo={this.props.AddTodo}
          ChangeNewTodoDesc= {this.props.ChangeNewTodoDesc}
          description = {this.props.newDescription}
        />
        <div className="todolist">
          {
            this.unCompletedTodos.length !==0 ? this.unCompletedTodos.map(item=>(
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
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
          }
          {
            this.completedTodos.length !==0 ?
            <Collapse bordered={false} defaultActiveKey={['0']}>
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
            :null
          }

        </div>
      </div>
    )
  }
}




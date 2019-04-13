import React from 'react'
import dayJs from 'dayjs'
import { Collapse,Empty } from 'antd';
import NewTodo from './newTodo'
import TodoItem from './todoItem'

import './index.scss'

interface IConnectProps {
  todos:any,
  newDescription: string,
  editingId: number,
  ChangeNewTodoDesc: (des:string)=>any
  ToggleEditId: (id:number)=>any
  AddTodo: (params)=>(dispatch)=>Promise<any>
  UpdateTodo: (id:number,params)=>(dispatch)=>Promise<any>
  CompletedTodo: (id:number,params)=>(dispatch)=>Promise<any>
}

const {Panel} = Collapse

export default (props:IConnectProps)=>{
  const completedTodos = props.todos
    .filter(todo=>!todo.deleted)
    .filter(todo=>todo.completed)
    .filter(todo=>dayJs(todo.completed_at).format('YYYY-MM-DD') === dayJs().format('YYYY-MM-DD'))
  const unCompletedTodos = props.todos
    .filter(todo=>!todo.deleted)
    .filter(todo=>!todo.completed)
  return(
    <div id="todo" className='content'>
    <NewTodo
      AddTodo={props.AddTodo}
      ChangeNewTodoDesc= {props.ChangeNewTodoDesc}
      description = {props.newDescription}
    />
    <div className="todolist">
      {
        unCompletedTodos.length !==0 ? unCompletedTodos.map(item=>(
          <TodoItem
            key={item.id}
            description={item.description}
            id={item.id}
            completed={item.completed}
            editingId={props.editingId}
            updateTodo = {props.UpdateTodo}
            toggleEditId={props.ToggleEditId}
            completedTodo = {props.CompletedTodo}
          />
        ))
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
      }
      {
        completedTodos.length !==0 ?
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="最近完成任务" key="1" >
          {
              completedTodos.map(item=>(
              <TodoItem
                key={item.id}
                description={item.description}
                id={item.id}
                completed={item.completed}
                editingId={props.editingId}
                updateTodo = {props.UpdateTodo}
                toggleEditId={props.ToggleEditId}
                completedTodo ={props.CompletedTodo}
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


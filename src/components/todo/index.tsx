import React from 'react'
import NewTodo from './newTodo'
import TodoItem from './todoItem'
import { connect } from 'react-redux'

import {FetchTodo} from 'src/store/todoReducer/actions'

import './index.scss'



const mapStateToProps = ({Todo})=>({todos:Todo.todos})
const mapDispatchToProps = (dispatch:any)=>({
  fetchTodos:()=>dispatch(FetchTodo())
})

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<any,any>{
  constructor(props){
    super(props)
  }
  get completedTodos(){
    return this.props.todos.filter(todo=>todo.completed)
  }
  get unCompletedTodos(){
    return this.props.todos.filter(todo=>!todo.completed)
  }
  componentDidMount (){
    this.props.fetchTodos()
  }
  public render(){
    return(
      <div id="todo">
        <NewTodo/>
        <div className="todolist">
          {
            this.unCompletedTodos.map(item=>(
              <TodoItem
                key={item.id}
                description={item.description}
                id={item.id}
                deleted = {item.deleted}
                completed={item.completed}
              />
            ))
          }
          {
            this.completedTodos.map(item=>(
              <TodoItem
                key={item.id}
                description={item.description}
                id={item.id}
                deleted = {item.deleted}
                completed={item.completed}
              />
            ))
          }
        </div>
      </div>
    )
  }
}




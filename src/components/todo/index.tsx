import React from 'react'
import NewTodo from './newTodo'
import TodoItem from './todoItem'
import axios from 'src/config/axios'
import { connect } from 'react-redux'

import './index.scss'

interface IState{
  todos: any[],
  editingId: number
}

const mapStateToProps = state=>({...state})
const mapDispatchToProps = dispatch=>({})

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<any,IState>{
  constructor(props){
    super(props)
    this.state = {
      editingId: -1,
      todos:[],
    }
  }
  get completedTodos(){
    return this.state.todos.filter(todo=>todo.completed)
  }
  get unCompletedTodos(){
    return this.state.todos.filter(todo=>!todo.completed)
  }
  getTodos = async ()=>{
    try{
      const response = await axios.get('/todos')
      const todos = response.data.resources.filter(todo=>!todo.deleted)
      this.setState({todos})
    }catch(e){
      console.error(e)
    }
  }
  addTodo= async (description:string)=>{
    try{
      const response = await axios.post('/todos',{description})
      this.setState({
        todos:[response.data.resource,...this.state.todos]
      })
    }catch(e){
      console.log('addtodo',e)
    }
  }
  updateTodo = async (id:number,params:any)=>{
    if('description' in params && this.state.editingId=== -1){
      return
    }
    try{
      const response = await axios.put(`/todos/${id}`,params)
      const {resource} = response.data
      let newTodos:any[]
      if(resource.deleted){
        const deleteIndex:number = this.state.todos.findIndex(todo=>todo.id===resource.id)
        newTodos = [...this.state.todos]
        newTodos.splice(deleteIndex,1)
      }else{
        newTodos = this.state.todos.map( todo=> todo.id===resource.id ? resource:todo)
      }
      this.setState({
        editingId: -1,
        todos: newTodos
      })
    }catch(e){
      console.error(e)
    }
  }
  toEditing =(id:number)=>{
    this.setState({
      editingId: id
    })
  }
  componentDidMount (){
    this.getTodos()
    console.log(this.props)
  }
  public render(){
    return(
      <div id="todo">
        <NewTodo addTodo={this.addTodo}/>
        <div className="todolist">
          {
            this.unCompletedTodos.map(item=>(
              <TodoItem
                key={item.id}
                description={item.description}
                id={item.id}
                deleted = {item.deleted}
                completed={item.completed}
                editingId = {this.state.editingId}
                toEditing={this.toEditing}
                update = {this.updateTodo}
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
                editingId = {this.state.editingId}
                toEditing={this.toEditing}
                update = {this.updateTodo}
              />
            ))
          }
        </div>
      </div>
    )
  }
}




import React from 'react'
import NewTodo from './newTodo'
import TodoItem from './todoItem'
import axios from 'src/config/axios'


export default class extends React.Component{
  addTodo= async (description:string)=>{
    const response = await axios.post('/todos',{description})
    console.log(response)
  }

  render(){
    return(
      <div id="todo">
        <NewTodo addTodo={this.addTodo}/>
        <div className="todolist">
          <TodoItem/>
        </div>
      </div>
    )
  }
}

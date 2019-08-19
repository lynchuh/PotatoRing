import React, { Fragment } from 'react'
import { Pagination } from 'antd'

import TodoList from './todoList'

const DeletedTodos = (props)=>{
  const pageSize = 10
  const [current,setCurrent] = React.useState(1)
  return(
    <Fragment>
      <TodoList
        list ={props.todos.slice((current-1)*pageSize,current*pageSize)}
        recoverAction={props.turnToUnDeleted}
        deleteAction={()=>void 0}
      />
      <div className='Pagination_wrapper'>
        <Pagination defaultCurrent={1} total={props.todos.length}
          current={current} pageSize={pageSize}
          onChange={DeletedTodos.changePage.bind(undefined,setCurrent)}/>
        <span className='tips'>总计{props.todos.length}个任务</span>
      </div>
    </Fragment>
  )
}
DeletedTodos.changePage= (setCurrent,page)=>{
  setCurrent(page)
}

export default DeletedTodos

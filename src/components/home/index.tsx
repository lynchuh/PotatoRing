import React from 'react'
import { Menu,Dropdown,Icon } from 'antd'
import {connect} from 'react-redux'

// import Todo from 'src/components/todo'
// import Tomatoes from 'src/components/tomatoes'

import Statistics from '../statistics'
import logo from 'src/static/logo.png'

import { VerifyUser,InitData} from 'src/store/user/action'
import {AddTodo, ChangeNewTodoDesc, ToggleEditId, UpdateTodo, CompletedTodo} from 'src/store/todos/actions'
import { AbortTomatoes, AddTomatoes,ChangeTomaoDesc } from 'src/store/tomatoes/action'


import './index.scss'

// interface IIndexState {
//   userInfo: any,
// }

// interface IRouter {
//   history: any
// }

const mapStateToProps=({UserReducer,TodoReducer,TomatoReducer})=>({
  userInfo:UserReducer.userInfo,
  TomatoReducer,
  TodoReducer
})
const mapDispatchToProps={
  VerifyUser,
  InitData,
  AddTodo,
  ChangeNewTodoDesc,
  ToggleEditId,
  UpdateTodo,
  CompletedTodo,
  AbortTomatoes,
  AddTomatoes,
  ChangeTomaoDesc
}

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<any,any>{
  componentWillMount(){
    this.props.VerifyUser()
    this.props.InitData()
  }
  logout=()=>{
    localStorage.setItem('xToken','')
    this.props.history.push('/login')
  }
  public render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="user" />
          <span onClick={()=>console.log('click')}>个人设置</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type="poweroff" />
          <span onClick={this.logout}>登出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='container' id='home'>
        <header>
          <img className='logo' src={logo} alt=""/>
          <h1>番茄土豆</h1>
          <Dropdown overlay={menu}>
            <span className='userInfo'>
              <span className='userName'>{this.props.userInfo ? this.props.userInfo.account:''}</span>
              <Icon type="down" />
            </span>
          </Dropdown>
        </header>
        {/* <main>
          <Tomatoes
            {...this.props.TomatoReducer}
            AbortTomatoes = {this.props.AbortTomatoes}
            AddTomatoes ={this.props.AddTomatoes}
            ChangeTomaoDesc ={this.props.ChangeTomaoDesc}
          />
          <Todo
            {...this.props.TodoReducer}
            AddTodo={this.props.AddTodo}
            ChangeNewTodoDesc={this.props.ChangeNewTodoDesc}
            ToggleEditId ={this.props.ToggleEditId}
            UpdateTodo = {this.props.UpdateTodo}
            CompletedTodo= {this.props.CompletedTodo}
          />
        </main> */}
        <main>
          <Statistics
            tomatoes={this.props.TomatoReducer.tomatoes}
            todos= {this.props.TodoReducer.todos }
          />
        </main>
      </div>
    )
  }
}

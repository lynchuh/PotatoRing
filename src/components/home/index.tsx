import React from 'react'
import { Menu,Dropdown,Icon } from 'antd'
import {connect} from 'react-redux'

import Todo from 'src/components/todo'
import Tomatoes from 'src/components/tomatoes'

import Statistics from '../statistics'
import logo from 'src/static/logo.png'

import { VerifyUser,InitData} from 'src/store/user/action'
import {AddTodo, ChangeNewTodoDesc, ToggleEditId, UpdateTodo, CompletedTodo} from 'src/store/todos/action'
import { UpdateTomato, AddTomatoes,ChangeTomatoDesc } from 'src/store/tomatoes/action'

import './index.scss'

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
  UpdateTomato,
  AddTomatoes,
  ChangeTomatoDesc
}

interface IProps {
  VerifyUser: ()=>(dispatch)=>Promise<any>
  InitData: ()=>(dispatch)=>Promise<any>
  ChangeNewTodoDesc: (desc:string)=>any
  ToggleEditId: ()=>any
  AddTodo: ()=>(dispatch)=>Promise<any>
  UpdateTodo: ()=>(dispatch)=>Promise<any>
  CompletedTodo: ()=>(dispatch)=>Promise<any>
  AddTomatoes: ()=>(dispatch)=>Promise<any>
  UpdateTomato: (id,params)=>(dispatch)=>Promise<any>
  ChangeTomatoDesc:()=>any
  userInfo: any
  TomatoReducer:any
  TodoReducer: any
  history: any
}

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<IProps,never>{
  componentWillMount(){
    this.props.VerifyUser()
    this.props.InitData()
  }
  logout=()=>{
    localStorage.setItem('xToken','')
    this.props.history.push('/login')
  }
  get sortData(){
    const todos = this.props.TodoReducer.todos.sort((a,b)=>Date.parse(b.completed_at)-Date.parse(a.completed_at))
    const tomatoes = this.props.TomatoReducer.tomatoes.sort((a,b)=>Date.parse(b.started_at)-Date.parse(a.started_at))
    return {todos,tomatoes}
  }
  public render(){
    const menu = (
      <Menu>
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
        <main>
          <Tomatoes
            {...this.props.TomatoReducer}
            UpdateTomato = {this.props.UpdateTomato}
            AddTomatoes ={this.props.AddTomatoes}
            ChangeTomatoDesc ={this.props.ChangeTomatoDesc}
          />
          <Todo
            {...this.props.TodoReducer}
            AddTodo={this.props.AddTodo}
            ChangeNewTodoDesc={this.props.ChangeNewTodoDesc}
            ToggleEditId ={this.props.ToggleEditId}
            UpdateTodo = {this.props.UpdateTodo}
            CompletedTodo= {this.props.CompletedTodo}
          />
        </main>
        <Statistics
          tomatoes={this.sortData.tomatoes}
          todos= {this.sortData.todos }
          UpdateTodo = {this.props.UpdateTodo}
          CompletedTodo = {this.props.CompletedTodo}
          UpdateTomato = {this.props.UpdateTomato}
          AddTomatoes = {this.props.AddTomatoes}
        />
      </div>
    )
  }
}

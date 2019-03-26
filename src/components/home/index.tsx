import React from 'react'
import { Menu,Dropdown,Icon } from 'antd'

import axios from 'src/config/axios'
import Todo from 'src/components/todo'
import Tomatoes from 'src/components/tomatoes'
import logo from 'src/static/logo.png'

import './index.scss'

interface IIndexState {
  userInfo: any,
}

interface IRouter {
  history: any
}

export default class extends React.Component<IRouter,IIndexState>{
  constructor(props:any){
    super(props)
    this.state = {
      userInfo: null
    }
  }
  async componentWillMount(){
    await this.getCurrentUser()
  }
  getCurrentUser = async ()=>{
    const response = await axios.get('/me')
    if(!this.state.userInfo) {this.setState({userInfo: response.data})}
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
      <div className='container index' id='Index'>
        <header>
          <img className='logo' src={logo} alt=""/>
          <h1>番茄土豆</h1>
          <Dropdown overlay={menu}>
            <span className='userInfo'>
              <span className='userName'>{this.state.userInfo ? this.state.userInfo.account:''}</span>
              <Icon type="down" />
            </span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes />
          <Todo />
        </main>
      </div>
    )
  }
}

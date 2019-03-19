import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Form } from 'antd'
import axios from 'src/config/axios'

import './index.scss'

interface ISignInState {
  account: string,
  password: string,
}

export default class extends React.Component<any,ISignInState>{
  constructor(props:any){
    super(props)
    this.state = {
      account:'',
      password: '',
    }
  }
  async componentDidMount(){
    await this.getCurrentUser()
  }
  submit= async (e:React.FormEvent<EventTarget>)=>{
    e.preventDefault()
    const {account,password} = this.state
    try{
      await axios.post('sign_in/user',{
        account,
        password,
      })
      this.props.history.push('/')
    }catch(e){
      console.error(e)
    }
  }
  changeFormData(target:string,event:any){
    const newVal = {}
    newVal[target] = event.target.value
    this.setState(newVal)
  }
  getCurrentUser = async ()=>{
    const response = await axios.get('/me')
    if(response) { this.props.history.push('/') }
  }
  public render(){
    const { account,password } = this.state
    return (
      <div className= 'container login' >
        <h1>登陆</h1>
        <Form onSubmit={this.submit}>
          <Input placeholder='请输入用户名' value={account} onChange={this.changeFormData.bind(this,'account')}/>
          <Input.Password placeholder='请输入密码' value={password} onChange={this.changeFormData.bind(this,'password')}/>
          <Button type='primary' htmlType='submit' >登陆</Button>
        </Form>
        <span>还没有账号？<Link to='/signUp'>点此注册</Link></span>
      </div>
    )
  }
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import axios from 'src/config/axios'

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
  submit= async ()=>{
    const {account,password} = this.state
    try{
      await axios.post('sign_in/user',{
        account,
        password,
      })
      this.props.history.push('/')
    }catch(e){
      throw new Error(e)
    }
  }
  changeFormData(target:string,event:any){
    const newVal = {}
    newVal[target] = event.target.value
    this.setState(newVal)
  }
  public render(){
    const { account,password } = this.state
    return (
      <div className= 'container' >
        <h1>登陆</h1>
        <Input placeholder='请输入用户名' value={account} onChange={this.changeFormData.bind(this,'account')}/>
        <Input.Password placeholder='请输入密码' value={password} onChange={this.changeFormData.bind(this,'password')}/>
        <Button onClick={this.submit}>登陆</Button>
        <span>还没有账号？<Link to='/signUp'>点此注册</Link></span>
      </div>
    )
  }
}

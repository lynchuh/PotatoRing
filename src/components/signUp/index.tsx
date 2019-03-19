import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button,Form } from 'antd'
import axios from 'src/config/axios'

interface ISignUpState {
  account: string,
  password: string,
  passwordConfirm: string
}

export default class extends React.Component<any,ISignUpState>{
  constructor(props){
    super(props)
    this.state = {
      account:'',
      password: '',
      passwordConfirm:''
    }
  }
  async componentDidMount(){
    await this.getCurrentUser()
  }
  submit= async (e)=>{
    e.preventDefault()
    const {account,password,passwordConfirm} = this.state
    try{
      await axios.post('sign_up/user',{
        account,
        password,
        password_confirmation: passwordConfirm
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
    const { account,password,passwordConfirm } = this.state
    return (
      <div className= 'container sign_up' >
        <h1>注册</h1>
        <Form onSubmit={this.submit} >
          <Input placeholder='请输入用户名' value={account} onChange={this.changeFormData.bind(this,'account')}/>
          <Input.Password placeholder='请输入密码' value={password} onChange={this.changeFormData.bind(this,'password')}/>
          <Input.Password placeholder='请确认密码' value={passwordConfirm} onChange={this.changeFormData.bind(this,'passwordConfirm')} />
          <Button type='primary' htmlType='submit' onClick={this.submit}>注册</Button>
        </Form>
        <span>已经有账号？<Link to='/login'>点此登陆</Link></span>
      </div>
    )
  }
}

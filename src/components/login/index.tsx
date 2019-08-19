import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Form } from 'antd'
import { connect } from 'react-redux'

import { VerifyUser,Login,HasReadErrorInfo } from 'src/store/user/action'

import './index.scss'

interface ISignInState {
  account: string,
  password: string,
}
interface ISignInProps{
  VerifyUser:()=>(dispatch)=>Promise<any>
  Login:(params)=>(dispatch)=>Promise<any>
  HasReadErrorInfo:()=>any
  errorInfo: any
  history:any
}
const mapStateToProps= ({UserReducer})=>({errorInfo: UserReducer.error})

const mapDispatchToProps = {
  VerifyUser,
  Login,
  HasReadErrorInfo
}

@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<ISignInProps,ISignInState>{
  constructor(props:any){
    super(props)
    this.state = {
      account:'',
      password: '',
    }
  }
  submit= (e:React.FormEvent<EventTarget>)=>{
    e.preventDefault()
    const {account,password} = this.state
    this.props.Login({account,password})
  }
  changeFormData(target:string,event:any){
    const newVal = {}
    newVal[target] = event.target.value
    this.setState(newVal)
  }
  componentDidMount(){
    this.props.VerifyUser()
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

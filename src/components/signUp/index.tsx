import React from 'react'
import { Link } from 'react-router-dom'
import {Input, Button, Form, Alert,message} from 'antd'
import {connect} from 'react-redux'

import { VerifyUser,SignUp,HasReadErrorInfo } from 'src/store/user/action'

interface ISignUpState {
  account: string,
  password: string,
  passwordConfirm: string
}

interface ISignUpProps{
  VerifyUser:()=>(dispatch)=>Promise<any>
  SignUp:(params)=>(dispatch)=>Promise<any>
  HasReadErrorInfo:()=>any
  errorInfo: any
}

const mapDispatchToProps = {VerifyUser,SignUp,HasReadErrorInfo}
const mapStateToProps= ({UserReducer})=>({errorInfo: UserReducer.error})


@connect(mapStateToProps,mapDispatchToProps)

export default class extends React.Component<ISignUpProps,ISignUpState>{
  constructor(props){
    super(props)
    this.state = {
      account:'',
      password: '',
      passwordConfirm:''
    }
  }
  submit= async (e)=>{
    e.preventDefault()
    const {account,password,passwordConfirm} = this.state
    if(password !== passwordConfirm){
      message.error('两次密码不一致')
      return
    }
    this.props.SignUp({account,password,password_confirmation: passwordConfirm})
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
    const { account,password,passwordConfirm } = this.state
    const {errorInfo} = this.props
    return (
      <div className= 'container sign_up' >
        <h1>注册</h1>
        {
          errorInfo ? (
            <Alert
              message={typeof errorInfo === 'string'? errorInfo: errorInfo.reduce((a,b)=>a.concat(`+ ${b}`),'')}
              type="error"
              showIcon={true}
              closable={true}
              onClose={()=>this.props.HasReadErrorInfo()}
            />
          ) : null
        }
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

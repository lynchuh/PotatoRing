import axios from 'axios'

import history from './history'
import { appId,appSecret } from './appKey'

// 生成一个实例
const instance = axios.create({
  baseURL:'https://gp-server.hunger-valley.com',
  headers:{
    't-app-id':appId,
    't-app-secret':appSecret
  }
})
// 请求拦截器
instance.interceptors.request.use( config=> {
  const xToken = localStorage.getItem('xToken')
  if(xToken){
   // tslint:disable-next-line:no-string-literal
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config
},error=>{
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(response=>{
  if(response.headers['x-token']){
    localStorage.setItem('xToken',response.headers['x-token'])
  }
  return response
},error=>{
  if(error.response && error.response.status === 401){ // 与后端协议凡是没有登陆，返回401
    if(history.location.pathname === '/'){
      history.push('/login')
    }
  }
  return Promise.reject(error)
})

export default instance

import axios from 'axios'

const appId = 'jvsMdkTzjo11tbKdhSD57TgL'
const appSecret = 'buo2VrBQcNCxXspdzfGBhJiu'

// 生成一个实例
const instance = axios.create({
  baseURL:'https://gp-server.hunger-valley.com',
  headers:{
    't-app-id':appId,
    't-app-secret':appSecret
  }
})
// 拦截器
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
instance.interceptors.response.use(response=>{
  if(response.headers['x-token']){
    localStorage.setItem('xToken',response.headers['x-token'])
  }
  return response
},error=>{
  return Promise.reject(error)
})

export default instance

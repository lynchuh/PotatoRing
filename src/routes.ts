import Login from './components/login'
import Home from './components/home'
import SignUp from './components/signUp'

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path:'/login',
    component: Login
  },
  {
    path: '/signUp',
    component: SignUp
  }
]
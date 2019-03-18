import React, { Fragment } from 'react';
import { BrowserRouter,Route,Link } from 'react-router-dom'

import Login from './components/login'
import Index from './components/index'
import SignUp from './components/signUp'
import './App.scss';


// login signUp index
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Link to='/' >首页</Link>
            <Link to='/login' >登陆</Link>
            <Link to='/signUp' >注册</Link>
            <Route path='/' exact={true} component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/signUp' component={SignUp} />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
